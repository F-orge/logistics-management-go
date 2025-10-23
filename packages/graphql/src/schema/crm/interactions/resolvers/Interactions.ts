import { Cases, Contacts, User } from "../../../../zod.schema";
import type { InteractionsResolvers } from "./../../../types.generated";
export const Interactions: InteractionsResolvers = {
  case: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("crm.cases")
      .selectAll("crm.cases")
      .innerJoin("crm.interactions", "crm.interactions.caseId", "crm.cases.id")
      .where("crm.interactions.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Cases;
  },
  contact: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("crm.contacts")
      .selectAll("crm.contacts")
      .innerJoin(
        "crm.interactions",
        "crm.interactions.contactId",
        "crm.contacts.id"
      )
      .where("crm.interactions.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as Contacts;
  },
  user: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("user")
      .selectAll("user")
      .innerJoin("crm.interactions", "crm.interactions.userId", "user.id")
      .where("crm.interactions.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as User;
  },
};
