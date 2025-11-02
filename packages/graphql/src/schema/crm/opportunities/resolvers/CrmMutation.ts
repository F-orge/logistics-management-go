import { GraphQLError } from "graphql";
import {
	CrmOpportunitySource,
	CrmOpportunityStage,
} from "../../../../db.types";
import {
	type Opportunities,
	UpdateOpportunityInputSchema,
} from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";

export const CrmMutation: Pick<
	CrmMutationResolvers,
	"createOpportunity" | "updateOpportunity"
> = {
	createOpportunity: async (_, args, ctx) => {
		// Validate required fields
		if (!args.value.name || args.value.name.trim().length === 0) {
			throw new GraphQLError("Opportunity name is required", {
				extensions: { code: "VALIDATION_ERROR" },
			});
		}

		if (!args.value.stage) {
			throw new GraphQLError("Opportunity stage is required", {
				extensions: { code: "VALIDATION_ERROR" },
			});
		}

		if (!args.value.companyId) {
			throw new GraphQLError("Company ID is required", {
				extensions: { code: "VALIDATION_ERROR" },
			});
		}

		if (!args.value.contactId) {
			throw new GraphQLError("Contact ID is required", {
				extensions: { code: "VALIDATION_ERROR" },
			});
		}

		// Validate amount (dealValue must be greater than 0 if provided)
		if (args.value.dealValue !== undefined && args.value.dealValue !== null) {
			if (args.value.dealValue <= 0) {
				throw new GraphQLError("Deal value must be greater than 0", {
					extensions: { code: "VALIDATION_ERROR" },
				});
			}
		}

		// Validate FK: company exists
		const company = await ctx.db
			.selectFrom("crm.companies")
			.select("id")
			.where("id", "=", args.value.companyId)
			.executeTakeFirst();

		if (!company) {
			throw new GraphQLError("Company not found", {
				extensions: { code: "NOT_FOUND" },
			});
		}

		// Validate FK: contact exists
		const contact = await ctx.db
			.selectFrom("crm.contacts")
			.select("id")
			.where("id", "=", args.value.contactId)
			.executeTakeFirst();

		if (!contact) {
			throw new GraphQLError("Contact not found", {
				extensions: { code: "NOT_FOUND" },
			});
		}

		const trx = await ctx.db.startTransaction().execute();

		const { products, ...rest } = args.value;

		const newOpportunity = await trx
			.insertInto("crm.opportunities")
			.values({
				...rest,
				source: CrmOpportunitySource[rest.source],
				stage: CrmOpportunityStage[rest.stage],
			})
			.returningAll()
			.executeTakeFirstOrThrow();

		// add products to opportunity products
		const newOpportunityProducts = await trx
			.insertInto("crm.opportunityProducts")
			.values(
				products.map((row) => ({ opportunityId: newOpportunity.id, ...row })),
			)
			.returning(["productId", "quantity"])
			.execute();

		const dbProducts = await trx
			.selectFrom("crm.products")
			.select(["id", "price"])
			.where(
				"id",
				"in",
				newOpportunityProducts.map((row) => row.productId),
			)
			.execute();

		// add product prices with quantity to deal value
		const totalPrice = dbProducts
			.map(
				(row) =>
					newOpportunityProducts.find((subRow) => subRow.productId === row.id)!
						.quantity * row.price,
			)
			.reduce((prev, curr) => prev + curr);

		await trx
			.updateTable("crm.opportunities")
			.set("dealValue", (eb) => eb("dealValue", "+", totalPrice))
			.where("id", "=", newOpportunity.id)
			.executeTakeFirstOrThrow();

		await trx.commit().execute();

		return newOpportunity as unknown as Opportunities;
	},
	updateOpportunity: async (_, args, ctx) => {
		const trx = await ctx.db.startTransaction().execute();

		const payload = UpdateOpportunityInputSchema().parse(args.value);

		// Get the previous state to detect changes
		const previousOpportunity = await trx
			.selectFrom("crm.opportunities")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirst();

		if (!previousOpportunity) {
			throw new GraphQLError("Opportunity not found", {
				extensions: { code: "NOT_FOUND" },
			});
		}

		// Validate amount if provided (dealValue must be greater than 0)
		if (payload.dealValue !== undefined && payload.dealValue !== null) {
			if (payload.dealValue <= 0) {
				throw new GraphQLError("Deal value must be greater than 0", {
					extensions: { code: "VALIDATION_ERROR" },
				});
			}
		}

		const updatedOpportunity = await trx
			.updateTable("crm.opportunities")
			.set({
				...payload,
				name: payload.name ? payload.name : undefined,
				source: payload.source
					? CrmOpportunitySource[payload.source]
					: undefined,
				stage: payload.stage ? CrmOpportunityStage[payload.stage] : undefined,
			})
			.where("id", "=", args.id)
			.returningAll()
			.executeTakeFirst();

		await trx.commit().execute();

		if (updatedOpportunity) {
			// Publish stage changed event - use payload.stage instead of args.value.stage
			if (payload.stage && payload.stage !== previousOpportunity.stage) {
				const newStage = CrmOpportunityStage[payload.stage];

				await ctx.pubsub.publish("crm.opportunity.stageChanged", {
					id: updatedOpportunity.id,
					newStage: newStage,
					previousStage: previousOpportunity.stage as CrmOpportunityStage,
					probability: updatedOpportunity.probability,
				});

				// Publish won event
				if (newStage === "CLOSED_WON") {
					await ctx.pubsub.publish("crm.opportunity.won", updatedOpportunity);
				}

				// Publish lost event
				if (newStage === "CLOSED_LOST") {
					await ctx.pubsub.publish("crm.opportunity.lost", updatedOpportunity);
				}
			}
		}

		return updatedOpportunity as Opportunities;
	},
};
