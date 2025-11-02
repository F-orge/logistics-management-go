import { GraphQLError } from "graphql";
import {
	type Campaigns,
	CreateCampaignInputSchema,
	UpdateCampaignInputSchema,
} from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";
export const CrmMutation: Pick<
	CrmMutationResolvers,
	"createCampaign" | "removeCampaign" | "updateCampaign"
> = {
	createCampaign: async (_parent, args, ctx) => {
		const payload = CreateCampaignInputSchema().parse(args.value);

		// Validate end date is after start date if both are provided
		if (payload.startDate && payload.endDate) {
			if (new Date(payload.endDate) <= new Date(payload.startDate)) {
				throw new GraphQLError("End date must be after start date");
			}
		}

		const result = await ctx.db
			.insertInto("crm.campaigns")
			.values(payload)
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as Campaigns;
	},
	updateCampaign: async (_parent, args, ctx) => {
		const payload = UpdateCampaignInputSchema().parse(args.value);

		// Check if campaign exists first
		const existingCampaign = await ctx.db
			.selectFrom("crm.campaigns")
			.select("id")
			.where("id", "=", args.id)
			.executeTakeFirst();

		if (!existingCampaign) {
			throw new GraphQLError("Campaign not found");
		}

		// Validate end date is after start date if both are provided
		if (payload.startDate && payload.endDate) {
			if (new Date(payload.endDate) <= new Date(payload.startDate)) {
				throw new GraphQLError("End date must be after start date");
			}
		}

		const result = await ctx.db
			.updateTable("crm.campaigns")
			.set(payload)
			.where("id", "=", args.id)
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as Campaigns;
	},
	removeCampaign: async (_parent, args, ctx) => {
		const result = await ctx.db
			.deleteFrom("crm.campaigns")
			.where("id", "=", args.id)
			.executeTakeFirst();

		const numDeleted = Number(result.numDeletedRows.toString());

		return {
			success: numDeleted > 0,
			numDeletedRows: numDeleted,
		};
	},
};
