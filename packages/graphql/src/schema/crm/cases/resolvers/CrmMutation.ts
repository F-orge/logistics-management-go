import {
  CrmCasePriority,
  CrmCaseStatus,
  CrmCaseType,
} from "../../../../db.types";
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
      .values({
        ...payload,
        priority: payload.priority
          ? CrmCasePriority[payload.priority]
          : CrmCasePriority.MEDIUM,
        status: payload.status
          ? CrmCaseStatus[payload.status]
          : CrmCaseStatus.NEW,
        type: payload.type ? CrmCaseType[payload.type] : CrmCaseType.PROBLEM,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Cases;
  },
  updateCase: async (_parent, args, ctx) => {
    const payload = UpdateCaseInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("crm.cases")
      .set({
        ...payload,
        priority: payload.priority
          ? CrmCasePriority[payload.priority]
          : undefined,
        status: payload.status ? CrmCaseStatus[payload.status] : undefined,
        type: payload.type ? CrmCaseType[payload.type] : undefined,
      })
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
