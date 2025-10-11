import { implement } from '@orpc/server';
import * as billingContracts from '@/orpc/contracts/billing/invoice_line_item';
import { InvoiceLineItemRepository } from '@/repositories/billing/invoiceLineItems';
import { HonoVariables } from '@/server';

export const paginateInvoiceLineItem = implement(
  billingContracts.paginateInvoiceLineItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceLineItemRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeInvoiceLineItem = implement(
  billingContracts.rangeInvoiceLineItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceLineItemRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inInvoiceLineItem = implement(
  billingContracts.inInvoiceLineItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceLineItemRepository(context.db);

    return repo.in(input).execute();
  });

export const createInvoiceLineItem = implement(
  billingContracts.createInvoiceLineItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceLineItemRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateInvoiceLineItem = implement(
  billingContracts.updateInvoiceLineItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceLineItemRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteInvoiceLineItem = implement(
  billingContracts.deleteInvoiceLineItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceLineItemRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
