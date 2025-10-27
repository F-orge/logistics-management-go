import {
  CreatePartnerInvoiceItemInputSchema,
  PartnerInvoiceItems,
  UpdatePartnerInvoiceItemInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<TmsMutationResolvers, 'addPartnerInvoiceItem'|'removePartnerInvoiceItem'|'updatePartnerInvoiceItem'> = {
  addPartnerInvoiceItem: async (_parent, args, ctx) => {
    const payload = CreatePartnerInvoiceItemInputSchema().parse(args.value);

    const trx = await ctx.db.startTransaction().execute();

    const result = await trx
      .insertInto("tms.partnerInvoiceItems")
      .values({
        partnerInvoiceId: args.id,
        ...payload,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    // add the item amount to the partner invoice totalAmount
    await trx
      .updateTable("tms.partnerInvoices")
      .set({
        totalAmount: (eb) => eb("totalAmount", "+", result.amount),
      })
      .where("id", "=", result.partnerInvoiceId)
      .executeTakeFirstOrThrow();

    await trx.commit().execute();

    return result as unknown as PartnerInvoiceItems;
  },
  updatePartnerInvoiceItem: async (_parent, args, ctx) => {
    const payload = UpdatePartnerInvoiceItemInputSchema().parse(args.value);

    const trx = await ctx.db.startTransaction().execute();

    const result = await trx
      .updateTable("tms.partnerInvoiceItems")
      .set({
        ...payload,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    // adjust the partner invoice totalAmount accordingly
    const previousItem = await trx
      .selectFrom("tms.partnerInvoiceItems")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const amountDifference = payload.amount - previousItem.amount;

    await trx
      .updateTable("tms.partnerInvoices")
      .set({
        totalAmount: (eb) => eb("totalAmount", "+", amountDifference),
      })
      .where("id", "=", result.partnerInvoiceId)
      .executeTakeFirstOrThrow();

    await trx.commit().execute();

    return result as unknown as PartnerInvoiceItems;
  },
  removePartnerInvoiceItem: async (_parent, args, ctx) => {
    const trx = await ctx.db.startTransaction().execute();

    const partnerInvoiceItem = await trx
      .selectFrom("tms.partnerInvoiceItems")
      .selectAll()
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    const result = await trx
      .deleteFrom("tms.partnerInvoiceItems")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    // minus the deleted item's amount from the partner invoice totalAmount
    await ctx.db
      .updateTable("tms.partnerInvoices")
      .set({
        totalAmount: (eb) => eb("totalAmount", "-", partnerInvoiceItem.amount),
      })
      .where("id", "=", partnerInvoiceItem.partnerInvoiceId)
      .executeTakeFirstOrThrow();

    await trx.commit().execute();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
