import { Contacts, User } from "../../../../zod.schema";
import type { CasesResolvers } from "./../../../types.generated";
export const Cases: CasesResolvers = {
  contact: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("crm.contacts")
      .selectAll("crm.contacts")
      .innerJoin("crm.cases", "crm.cases.contactId", "crm.contacts.id")
      .where("crm.cases.id", "=", parent.id as string)
      .executeTakeFirstOrThrow();

    return result as unknown as Contacts;
  },
  owner: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("user")
      .selectAll("user")
      .innerJoin("crm.cases", "crm.cases.ownerId", "user.id")
      .where("crm.cases.id", "=", parent.id as string)
      .executeTakeFirstOrThrow();

    return result as unknown as User;
  },
};
