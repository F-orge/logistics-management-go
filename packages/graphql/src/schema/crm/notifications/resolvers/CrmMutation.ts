import {
  CreateNotificationInputSchema,
  Notifications,
} from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";
export const CrmMutation: Pick<
  CrmMutationResolvers,
  "createNotification" | "updateNotification"
> = {
  createNotification: async (_parent, args, ctx) => {
    const payload = CreateNotificationInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("crm.notifications")
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Notifications;
  },
  updateNotification: async (_parent, args, ctx) => {
    const payload = CreateNotificationInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("crm.notifications")
      .set(payload)
      .where("id", "=", args.id)
      .where("isRead", "!=", true)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Notifications;
  },
};
