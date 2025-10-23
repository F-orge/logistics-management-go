import {
  Cases,
  CreateCaseInputSchema,
  UpdateCaseInputSchema,
} from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";
export const CrmMutation: Pick<CrmMutationResolvers, 'createCase'|'removeCase'|'updateCase'> = {
  createCase: async (_parent, args, ctx) => {
    const payload = CreateCaseInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("crm.cases")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Cases;
  },
  updateCase: async (_parent, args, ctx) => {
    const payload = UpdateCaseInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("crm.cases")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Cases;
  },
  removeCase: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("crm.cases")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
