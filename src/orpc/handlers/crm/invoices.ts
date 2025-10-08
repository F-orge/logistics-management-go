import { implement } from '@orpc/server';
import * as crmContracts from '@/orpc/contracts/crm';
import { HonoVariables } from '@/server';
import { InvoiceRepository } from '@/repositories/crm/invoices';

export const paginateInvoice = implement(crmContracts.paginateInvoiceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeInvoice = implement(crmContracts.rangeInvoiceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inInvoice = implement(crmContracts.inInvoiceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceRepository(context.db);

    return repo.in(input).execute();
  });

export const createInvoice = implement(crmContracts.createInvoiceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceRepository(context.db);

    return repo.create(input).execute() as any;
  });

export const updateInvoice = implement(crmContracts.updateInvoiceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceRepository(context.db);

    return repo.update(input.id, input.value).execute() as any;
  });

export const deleteInvoice = implement(crmContracts.deleteInvoiceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InvoiceRepository(context.db);

    return repo.delete(input).execute() as any;
  });
