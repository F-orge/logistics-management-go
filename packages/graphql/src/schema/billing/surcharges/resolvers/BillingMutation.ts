import {
	CreateSurchargeInputSchema,
	type Surcharges,
	UpdateSurchargeInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";

export const BillingMutation: Pick<
	BillingMutationResolvers,
	"createSurcharge" | "removeSurcharge" | "updateSurcharge"
> = {
	createSurcharge: async (_parent, args, ctx) => {
		const payload = CreateSurchargeInputSchema().parse(args.value);

		const result = await ctx.db
			.insertInto("billing.surcharges")
			.values(payload as any)
			.returningAll()
			.executeTakeFirstOrThrow();

		return result as unknown as Surcharges;
	},
	updateSurcharge: async (_parent, args, ctx) => {
		const payload = UpdateSurchargeInputSchema().parse(args.value);

		const previous = await ctx.db
			.selectFrom("billing.surcharges")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		const result = await ctx.db
			.updateTable("billing.surcharges")
			.set(payload as any)
			.where("id", "=", args.id)
			.returningAll()
			.executeTakeFirstOrThrow();

		// Publish deactivation event if surcharge is being deactivated
		if (payload.isActive === false && previous.isActive !== false) {
			await ctx.pubsub.publish("billing.surcharge.deactivated", {
				id: result.id,
				reason: "Surcharge deactivated",
			});
		}

		return result as unknown as Surcharges;
	},
	removeSurcharge: async (_parent, args, ctx) => {
		const result = await ctx.db
			.deleteFrom("billing.surcharges")
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		return {
			success: true,
			numDeletedRows: Number(result.numDeletedRows.toString()),
		};
	},
};
