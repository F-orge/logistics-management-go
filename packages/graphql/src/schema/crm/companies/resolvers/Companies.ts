import type { CompaniesResolvers } from "./../../../types.generated";

export const Companies: CompaniesResolvers = {
  owner: async (parent, _, ctx) => {
    const result = await ctx.db
      .selectFrom("user")
      .innerJoin("crm.companies", "crm.companies.ownerId", "user.id")
      .selectAll("user")
      .where("crm.companies.id", "=", parent.id as string)
      .executeTakeFirstOrThrow();

    return result;
  },
};
