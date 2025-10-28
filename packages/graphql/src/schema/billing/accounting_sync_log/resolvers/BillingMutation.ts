import { BillingSyncStatusEnum } from "../../../../db.types";
import {
  AccountingSyncLogs,
  CreateAccountingSyncLogInputSchema,
  UpdateAccountingSyncLogInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";

export const BillingMutation: Pick<BillingMutationResolvers, 'createAccountingSyncLog'|'removeAccountingSyncLog'|'updateAccountingSyncLog'> = {
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
    ctx.pubsub.publish("billing.accountingSync.triggered", {
      sourceType: result.recordType || "",
      sourceId: result.recordId || "",
      syncLogId: result.id,
    });

    return result as unknown as AccountingSyncLogs;
  },
  updateAccountingSyncLog: async (_parent, args, ctx) => {
    const payload = UpdateAccountingSyncLogInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("billing.accountingSyncLog")
      .set({
        ...payload,
        status: payload.status
          ? BillingSyncStatusEnum[payload.status]
          : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish sync status events
    if (payload.status) {
      if (payload.status === "SUCCESS") {
        ctx.pubsub.publish("billing.accountingSync.succeeded", {
          syncLogId: result.id,
          sourceType: result.recordType || "",
        });
      } else if (payload.status === "FAILED") {
        ctx.pubsub.publish("billing.accountingSync.failed", {
          syncLogId: result.id,
          sourceType: result.recordType || "",
          errorMessage: result.errorMessage || "",
        });
      }
    }

    return result as unknown as AccountingSyncLogs;
  },
  removeAccountingSyncLog: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("billing.accountingSyncLog")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
