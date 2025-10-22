import {
  CreateInteractionInputSchema,
  Interactions,
  UpdateInteractionInputSchema,
} from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";
export const CrmMutation: Pick<CrmMutationResolvers, 'createInteraction'|'removeInteraction'|'updateInteraction'> = {
  createInteraction: async (_parent, args, ctx) => {
    const payload = CreateInteractionInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("crm.interactions")
      .values(payload as any)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as Interactions;
  },
  updateInteraction: async (_parent, args, ctx) => {
    const payload = UpdateInteractionInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("crm.interactions")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Interactions;
  },
  removeInteraction: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("crm.interactions")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
