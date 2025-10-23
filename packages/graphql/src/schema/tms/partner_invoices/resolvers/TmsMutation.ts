import {
  CreatePartnerInvoiceInputSchema,
  PartnerInvoices,
  UpdatePartnerInvoiceInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<TmsMutationResolvers, 'createPartnerInvoice'|'removePartnerInvoice'|'updatePartnerInvoice'> = {
  createPartnerInvoice: async (_parent, args, ctx) => {
    const payload = CreatePartnerInvoiceInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("tms.partnerInvoices")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as PartnerInvoices;
  },
  updatePartnerInvoice: async (_parent, args, ctx) => {
    const payload = UpdatePartnerInvoiceInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("tms.partnerInvoices")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as PartnerInvoices;
  },
  removePartnerInvoice: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("tms.partnerInvoices")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
