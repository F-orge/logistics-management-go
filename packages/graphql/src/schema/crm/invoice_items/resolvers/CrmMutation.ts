import {
  CreateInvoiceItemInputSchema,
  InvoiceItems,
  UpdateInvoiceLineItemInputSchema,
} from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";
export const CrmMutation: Pick<CrmMutationResolvers, 'createInvoiceItem'|'removeInvoiceItem'|'updateInvoiceItem'> = {
  createInvoiceItem: async (_parent, args, ctx) => {
    const payload = CreateInvoiceItemInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("crm.invoiceItems")
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as InvoiceItems;
  },
  updateInvoiceItem: async (_parent, args, ctx) => {
    const payload = UpdateInvoiceLineItemInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("crm.invoiceItems")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as InvoiceItems;
  },
  removeInvoiceItem: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("crm.invoiceItems")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
