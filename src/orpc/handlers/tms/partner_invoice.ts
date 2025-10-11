import { implement } from '@orpc/server';
import * as tmsContracts from '@/orpc/contracts/tms/partner_invoice';
import { PartnerInvoiceRepository } from '@/repositories/tms/partnerInvoices';
import { HonoVariables } from '@/server';

export const paginatePartnerInvoice = implement(
  tmsContracts.paginatePartnerInvoiceContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PartnerInvoiceRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangePartnerInvoice = implement(
  tmsContracts.rangePartnerInvoiceContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PartnerInvoiceRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inPartnerInvoice = implement(tmsContracts.inPartnerInvoiceContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PartnerInvoiceRepository(context.db);

    return repo.in(input).execute();
  });

export const createPartnerInvoice = implement(
  tmsContracts.createPartnerInvoiceContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PartnerInvoiceRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updatePartnerInvoice = implement(
  tmsContracts.updatePartnerInvoiceContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PartnerInvoiceRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deletePartnerInvoice = implement(
  tmsContracts.deletePartnerInvoiceContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PartnerInvoiceRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
