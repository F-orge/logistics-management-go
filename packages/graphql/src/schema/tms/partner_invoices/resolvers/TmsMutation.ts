import { TmsPartnerInvoiceStatusEnum } from "../../../../db.types";
import {
  CreatePartnerInvoiceInputSchema,
  PartnerInvoices,
  UpdatePartnerInvoiceInputSchema,
} from "../../../../zod.schema";
import type { TmsMutationResolvers } from "./../../../types.generated";
export const TmsMutation: Pick<
  TmsMutationResolvers,
  "createPartnerInvoice" | "updatePartnerInvoice"
> = {
  createPartnerInvoice: async (_parent, args, ctx) => {
    const { items, ...rest } = CreatePartnerInvoiceInputSchema().parse(
      args.value
    );

    const trx = await ctx.db.startTransaction().execute();

    const result = await ctx.db
      .insertInto("tms.partnerInvoices")
      .values({
        ...rest,
        totalAmount: 0, // will be updated after inserting items
        status: rest.status
          ? TmsPartnerInvoiceStatusEnum[rest.status]
          : TmsPartnerInvoiceStatusEnum.PENDING,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    await trx
      .insertInto("tms.partnerInvoiceItems")
      .values(
        items.map((item) => ({
          partnerInvoiceId: result.id,
          ...item,
        }))
      )
      .execute();

    const totalAmountResult = await trx
      .selectFrom("tms.partnerInvoiceItems")
      .select((eb) => eb.fn.sum("amount").as("total"))
      .where("partnerInvoiceId", "=", result.id)
      .executeTakeFirstOrThrow();

    const totalAmount = Number(totalAmountResult.total) || 0;

    await trx
      .updateTable("tms.partnerInvoices")
      .set({ totalAmount })
      .where("id", "=", result.id)
      .executeTakeFirstOrThrow();

    await trx.commit().execute();

    return result as unknown as PartnerInvoices;
  },
  updatePartnerInvoice: async (_parent, args, ctx) => {
    const payload = UpdatePartnerInvoiceInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("tms.partnerInvoices")
      .set({
        ...payload,
        status: payload.status
          ? TmsPartnerInvoiceStatusEnum[payload.status]
          : undefined,
      })
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as PartnerInvoices;
  },
};
