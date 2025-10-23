import {
  CreateDisputeInputSchema,
  Disputes,
  UpdateDisputeInputSchema,
} from "../../../../zod.schema";
import type { BillingMutationResolvers } from "./../../../types.generated";
export const BillingMutation: Pick<BillingMutationResolvers, 'createDispute'|'removeDispute'|'updateDispute'> = {
  createDispute: async (_parent, args, ctx) => {
    const payload = CreateDisputeInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("billing.disputes")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Disputes;
  },
  updateDispute: async (_parent, args, ctx) => {
    const payload = UpdateDisputeInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("billing.disputes")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Disputes;
  },
  removeDispute: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("billing.disputes")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
