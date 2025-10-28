import {
  TmsCurrencyEnum,
  TmsExpenseStatusEnum,
  TmsExpenseTypeEnum,
} from "../../../../db.types";
import {
  CreateExpenseInputSchema,
  Expenses,
  UpdateExpenseInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";

export const TmsMutation: Pick<TmsMutationResolvers, 'createExpense'|'removeExpense'|'updateExpense'> = {
  createExpense: async (_parent, args, ctx) => {
    const payload = CreateExpenseInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.expenses")
      .values({
        ...payload,
        currency: payload.currency
          ? TmsCurrencyEnum[payload.currency]
          : undefined,
        status: payload.status
          ? TmsExpenseStatusEnum[payload.status]
          : undefined,
        type: payload.type ? TmsExpenseTypeEnum[payload.type] : undefined,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish submitted event
    await ctx.pubsub.publish("tms.expense.submitted", result);

    return result as unknown as Expenses;
  },
  updateExpense: async (_parent, args, ctx) => {
    const payload = UpdateExpenseInputSchema().parse(args.value);

    // Get the previous state to detect changes
    const previousExpense = await ctx.db
      .selectFrom("tms.expenses")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("tms.expenses")
      .set({
        ...payload,
        currency: payload.currency
          ? TmsCurrencyEnum[payload.currency]
          : undefined,
        status: payload.status
          ? TmsExpenseStatusEnum[payload.status]
          : undefined,
        type: payload.type ? TmsExpenseTypeEnum[payload.type] : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish status changed event
    if (payload.status && payload.status !== previousExpense.status) {
      const status = payload.status as TmsExpenseStatusEnum;

      await ctx.pubsub.publish("tms.expense.statusChanged", {
        id: result.id,
        newStatus: status,
        previousStatus: previousExpense.status as TmsExpenseStatusEnum,
        driverId: result.driverId,
      });

      // Publish specific status events
      if (status === "APPROVED") {
        await ctx.pubsub.publish("tms.expense.approved", result);
      } else if (status === "REJECTED") {
        await ctx.pubsub.publish("tms.expense.rejected", {
          ...result,
          rejectionReason: null,
        });
      }
    }

    return result as unknown as Expenses;
  },
  removeExpense: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("tms.expenses")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
