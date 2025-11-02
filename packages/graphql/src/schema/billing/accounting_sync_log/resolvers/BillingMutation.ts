import { BillingSyncStatusEnum } from "../../../../db.types";
import {
	type AccountingSyncLogs,
	CreateAccountingSyncLogInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";

export const BillingMutation: Pick<
	BillingMutationResolvers,
	"createAccountingSyncLog"
> = {
	createAccountingSyncLog: async (_parent, args, ctx) => {
		const payload = CreateAccountingSyncLogInputSchema().parse(args.value);

		const result = await ctx.db
			.insertInto("billing.accountingSyncLog")
			.values({
				...payload,
				status: payload.status
					? BillingSyncStatusEnum[payload.status]
					: undefined,
			})
			.returningAll()
			.executeTakeFirstOrThrow();

		// Publish triggered event
		await ctx.pubsub.publish("billing.accountingSync.triggered", {
			sourceType: result.recordType || "",
			sourceId: result.recordId || "",
			syncLogId: result.id,
		});

		return result as unknown as AccountingSyncLogs;
	},
};
