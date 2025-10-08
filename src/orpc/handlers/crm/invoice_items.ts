import { implement } from '@orpc/server';
import * as crmContracts from '@/orpc/contracts/crm';
import { HonoVariables } from '@/server';
import { InvoiceItemRepository } from '@/repositories/crm/invoice_items';

export const paginateInvoiceItem = implement(crmContracts.paginateInvoiceItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceItemRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeInvoiceItem = implement(crmContracts.rangeInvoiceItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceItemRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inInvoiceItem = implement(crmContracts.inInvoiceItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceItemRepository(context.db);

    return repo.in(input).execute();
  });

export const createInvoiceItem = implement(crmContracts.createInvoiceItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceItemRepository(context.db);

    return repo.create(input).execute() as any;
  });

export const updateInvoiceItem = implement(crmContracts.updateInvoiceItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceItemRepository(context.db);

    return repo.update(input.id, input.value).execute() as any;
  });

export const deleteInvoiceItem = implement(crmContracts.deleteInvoiceItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceItemRepository(context.db);

    return repo.delete(input).execute() as any;
  });
