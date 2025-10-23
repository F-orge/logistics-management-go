import {
  CreateInvoiceInputSchema,
  Invoices,
  UpdateInvoiceInputSchema,
} from "../../../../zod.schema";
import type { CrmMutationResolvers } from "./../../../types.generated";
export const CrmMutation: Pick<
  CrmMutationResolvers,
  "createInvoice" | "removeInvoice" | "updateInvoice"
> = {
  createInvoice: async (_parent, args, ctx) => {
    const payload = CreateInvoiceInputSchema().parse(args.value);

    const result = await ctx.db
      .insertInto("crm.invoices")
      .values(payload as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Invoices;
  },
  updateInvoice: async (_parent, args, ctx) => {
    const payload = UpdateInvoiceInputSchema().parse(args.value);

    const result = await ctx.db
      .updateTable("crm.invoices")
      .set(payload as any)
      .where("id", "=", args.id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Invoices;
  },
  removeInvoice: async (_parent, args, ctx) => {
    const result = await ctx.db
      .deleteFrom("crm.invoices")
      .where("id", "=", args.id)
      .executeTakeFirstOrThrow();

    return {
      success: true,
      numDeletedRows: Number(result.numDeletedRows.toString()),
    };
  },
};
