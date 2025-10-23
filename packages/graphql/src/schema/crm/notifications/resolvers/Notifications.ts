import { User } from "../../../../zod.schema";
import type { NotificationsResolvers } from "./../../../types.generated";
export const Notifications: NotificationsResolvers = {
  user: async (parent, _args, ctx) => {
    const result = await ctx.db
      .selectFrom("user")
      .selectAll("user")
      .innerJoin("crm.notifications", "crm.notifications.userId", "user.id")
      .where("crm.notifications.id", "=", parent.id as string)
      .executeTakeFirst();

    return result as unknown as User;
  },
};
