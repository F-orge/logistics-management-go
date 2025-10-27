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

    return result as unknown as Expenses;
  },
  updateExpense: async (_parent, args, ctx) => {
    const payload = UpdateExpenseInputSchema().parse(args.value);

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
