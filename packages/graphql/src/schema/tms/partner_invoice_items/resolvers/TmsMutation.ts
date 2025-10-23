import {
  CreatePartnerInvoiceItemInputSchema,
  PartnerInvoiceItems,
  UpdatePartnerInvoiceItemInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<TmsMutationResolvers, 'createPartnerInvoiceItem'|'removePartnerInvoiceItem'|'updatePartnerInvoiceItem'> = {
  createPartnerInvoiceItem: async (_parent, args, ctx) => {
    const payload = CreatePartnerInvoiceItemInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.partnerInvoiceItems")
      .values(payload as any)
      .returningAll()
      .executeTakeFirst();

    return result as unknown as PartnerInvoiceItems;
  },
  updatePartnerInvoiceItem: async (_parent, args, ctx) => {
    const payload = UpdatePartnerInvoiceItemInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("tms.partnerInvoiceItems")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as PartnerInvoiceItems;
  },
  removePartnerInvoiceItem: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("tms.partnerInvoiceItems")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
