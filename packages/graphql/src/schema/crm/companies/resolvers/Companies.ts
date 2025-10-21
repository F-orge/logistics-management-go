import type { CompaniesResolvers } from "./../../../types.generated";

export const Companies: CompaniesResolvers = {
  owner: async (parent, _, ctx) => {
    const result = await ctx.db
      .selectFrom("user")
      .innerJoin("crm.companies", "crm.companies.id", "user.id")
      .select(["user.email", "user.emailVerified", "user.name", "user.image"])
      .where("crm.companies.id", "=", parent.id as string)
      .executeTakeFirstOrThrow();

    return result;
  },
};
