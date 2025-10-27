import { CrmInvoiceStatus, CrmPaymentMethod } from "../../../../db.types";
import {
  CreateInvoiceInputSchema,
  Invoices,
  UpdateInvoiceInputSchema,
} from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";
export const CrmMutation: Pick<
  CrmMutationResolvers,
  "createInvoice" | "updateInvoice"
> = {
  createInvoice: async (_parent, args, ctx) => {
    const payload = CreateInvoiceInputSchema().parse(args.value);

    const trx = await ctx.db.startTransaction().execute();

    const { items, ...rest } = payload;

    const result = await trx
      .insertInto("crm.invoices")
      .values({
        ...rest,
        paymentMethod: rest.paymentMethod
          ? CrmPaymentMethod[rest.paymentMethod]
          : CrmPaymentMethod.CREDIT_CARD,
        status: rest.status
          ? CrmInvoiceStatus[rest.status]
          : CrmInvoiceStatus.DRAFT,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    const prices = await trx
      .selectFrom("crm.products")
      .select(["id", "price"])
      .where(
        "id",
        "in",
        items.map((row) => row.productId)
      )
      .execute();

    const totalPrices = await trx
      .insertInto("crm.invoiceItems")
      .values(
        items.map((row) => ({
          invoiceId: result.id,
          ...row,
          price:
            Number(prices.find((p) => p.id === row.productId)!.price) *
            row.quantity,
        }))
      )
      .returning("price")
      .execute();

    const total = totalPrices
      .map((row) => Number(row.price))
      .reduce((sum, curr) => sum + curr, 0);

    await trx
      .updateTable("crm.invoices")
      .set({ total })
      .where("id", "=", result.id)
      .execute();

    await trx.commit().execute();

    return result as unknown as Invoices;
  },
  updateInvoice: async (_parent, args, ctx) => {
    const payload = UpdateInvoiceInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("crm.invoices")
      .set({
        ...payload,
        paymentMethod: payload.paymentMethod
          ? CrmPaymentMethod[payload.paymentMethod]
          : undefined,
        status: payload.status ? CrmInvoiceStatus[payload.status] : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Invoices;
  },
};
