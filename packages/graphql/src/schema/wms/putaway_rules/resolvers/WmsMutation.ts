import {
  CreatePutawayRuleInputSchema,
  PutawayRules,
  UpdatePutawayRuleInputSchema,
} from "../../../../zod.schema";
import type { WmsMutationResolvers } from "./../../../types.generated";
export const WmsMutation: Pick<WmsMutationResolvers, 'createPutawayRule'|'removePutawayRule'|'updatePutawayRule'> = {
  createPutawayRule: async (_parent, args, ctx) => {
    const payload = CreatePutawayRuleInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("wms.putawayRules")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as PutawayRules;
  },
  updatePutawayRule: async (_parent, args, ctx) => {
    const payload = UpdatePutawayRuleInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("wms.putawayRules")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as PutawayRules;
  },
  removePutawayRule: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("wms.putawayRules")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
