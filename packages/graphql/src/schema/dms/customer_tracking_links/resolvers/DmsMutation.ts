import {
  CreateCustomerTrackingLinkInputSchema,
  CustomerTrackingLinks,
  UpdateCustomerTrackingLinkInputSchema,
} from "../../../../zod.schema";
import type { DmsMutationResolvers } from "./../../../types.generated";
export const DmsMutation: Pick<
  DmsMutationResolvers,
  | "createCustomerTrackingLink"
  | "removeCustomerTrackingLink"
  | "updateCustomerTrackingLink"
> = {
  createCustomerTrackingLink: async (_parent, args, ctx) => {
    const payload = CreateCustomerTrackingLinkInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("dms.customerTrackingLinks")
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as CustomerTrackingLinks;
  },
  updateCustomerTrackingLink: async (_parent, args, ctx) => {
    const payload = UpdateCustomerTrackingLinkInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("dms.customerTrackingLinks")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as CustomerTrackingLinks;
  },
  removeCustomerTrackingLink: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("dms.customerTrackingLinks")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
