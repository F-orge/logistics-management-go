import { Notifications } from "../../../../zod.schema";
import type { CrmQueryResolvers } from "./../../../types.generated";
export const CrmQuery: Pick<CrmQueryResolvers, 'notification'|'notifications'> = {
  notifications: async (_parent, args, ctx) => {
    let query = ctx.db.selectFrom("crm.notifications").selectAll();

    if (args.page && args.perPage) {
      const offset = (args.page - 1) * args.perPage;
      query = query.offset(offset).limit(args.perPage);
    }

    const notifications = await query.execute();

    return notifications as unknown as Notifications[];
  },
  notification: async (_parent, args, ctx) => {
    const notification = await ctx.db
      .selectFrom("crm.notifications")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return notification as unknown as Notifications;
  },
};
