import { BillingDisputeStatusEnum } from "../../../../db.types";
import {
	CreateDisputeInputSchema,
	type Disputes,
	UpdateDisputeInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";

export const BillingMutation: Pick<
	BillingMutationResolvers,
	"createDispute" | "updateDispute"
> = {
	createDispute: async (_parent, args, ctx) => {
		const payload = CreateDisputeInputSchema().parse(args.value);

		const result = await ctx.db
			.insertInto("billing.disputes")
			.values({
				...payload,
				status: payload.status
					? BillingDisputeStatusEnum[payload.status]
					: undefined,
			})
			.returningAll()
			.executeTakeFirstOrThrow();

		// Publish opened event
		await ctx.pubsub.publish("billing.dispute.opened", result);

		return result as unknown as Disputes;
	},
	updateDispute: async (_parent, args, ctx) => {
		const payload = UpdateDisputeInputSchema().parse(args.value);

		// Get the previous state to detect changes
		const previousDispute = await ctx.db
			.selectFrom("billing.disputes")
			.selectAll()
			.where("id", "=", args.id)
			.executeTakeFirstOrThrow();

		const result = await ctx.db
			.updateTable("billing.disputes")
			.set({
				...payload,
				status: payload.status
					? BillingDisputeStatusEnum[payload.status]
					: undefined,
			})
			.where("id", "=", args.id)
			.returningAll()
			.executeTakeFirstOrThrow();

		// Publish status changed event
		if (payload.status && payload.status !== previousDispute.status) {
			const status = payload.status as BillingDisputeStatusEnum;

			await ctx.pubsub.publish("billing.dispute.statusChanged", {
				id: result.id,
				newStatus: status,
				previousStatus: previousDispute.status as BillingDisputeStatusEnum,
				clientId: result.clientId,
			});

			// Publish specific status events
			if (status === "UNDER_REVIEW") {
				await ctx.pubsub.publish("billing.dispute.underReview", result);
			} else if (status === "APPROVED") {
				await ctx.pubsub.publish("billing.dispute.approved", {
					...result,
					creditNoteId: null,
				});
			} else if (status === "DENIED") {
				await ctx.pubsub.publish("billing.dispute.denied", {
					...result,
					denialReason: null,
				});
			} else if (status === "CLOSED") {
				await ctx.pubsub.publish("billing.dispute.resolved", {
					...result,
					resolutionDetails: null,
				});
			}
		}

		return result as unknown as Disputes;
	},
};
