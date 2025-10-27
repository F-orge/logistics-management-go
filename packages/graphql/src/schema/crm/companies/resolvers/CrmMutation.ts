import {
  Companies,
  CreateCompanyInputSchema,
  UpdateCompanyInputSchema,
} from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";
export const CrmMutation: Pick<CrmMutationResolvers, 'createCompany'|'removeCompany'|'updateCompany'> = {
  createCompany: async (_, args, ctx) => {
    const payload = CreateCompanyInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("crm.companies")
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as Companies;
  },
  updateCompany: async (_, args, ctx) => {
    const payload = UpdateCompanyInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("crm.companies")
      .set(payload)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as Companies;
  },
  removeCompany: async (_, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("crm.companies")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
