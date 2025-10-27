import {
  CreateCustomerTrackingLinkInputSchema,
  CustomerTrackingLinks,
  UpdateCustomerTrackingLinkInputSchema,
} from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";

export const DmsMutation: Pick<
  DmsMutationResolvers,
  "createCustomerTrackingLink" | "updateCustomerTrackingLink"
> = {
  createCustomerTrackingLink: async (_parent, args, ctx) => {
    const payload = CreateCustomerTrackingLinkInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("dms.customerTrackingLinks")
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish generated event for new tracking link
    ctx.pubsub.publish("dms.trackingLink.generated", result);

    return result as unknown as CustomerTrackingLinks;
  },
  updateCustomerTrackingLink: async (_parent, args, ctx) => {
    const payload = UpdateCustomerTrackingLinkInputSchema().parse(args.value);

    // Get the previous state to detect expiration
    const previousLink = await ctx.db
      .selectFrom("dms.customerTrackingLinks")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await ctx.db
      .updateTable("dms.customerTrackingLinks")
      .set(payload)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // Publish expired event if link became inactive or expiration was set
    if (
      (payload.isActive === false && previousLink.isActive !== false) ||
      (payload.expiresAt &&
        !previousLink.expiresAt &&
        new Date(payload.expiresAt) <= new Date())
    ) {
      ctx.pubsub.publish("dms.trackingLink.expired", {
        id: result.id,
        deliveryTaskId: result.deliveryTaskId,
        trackingToken: result.trackingToken,
      });
    }

    return result as unknown as CustomerTrackingLinks;
  },
};
