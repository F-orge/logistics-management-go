import { implement } from '@orpc/server';
import * as dmsContracts from '@/orpc/contracts/dms';
import { DmsCustomerTrackingLinkRepository } from '@/repositories/dms/customerTrackingLinks';
import { HonoVariables } from '@/server';

export const paginateCustomerTrackingLink = implement(
  dmsContracts.paginateCustomerTrackingLinkContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DmsCustomerTrackingLinkRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeCustomerTrackingLink = implement(
  dmsContracts.rangeCustomerTrackingLinkContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DmsCustomerTrackingLinkRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inCustomerTrackingLink = implement(
  dmsContracts.inCustomerTrackingLinkContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DmsCustomerTrackingLinkRepository(context.db);

    return repo.in(input).execute();
  });

export const createCustomerTrackingLink = implement(
  dmsContracts.createCustomerTrackingLinkContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DmsCustomerTrackingLinkRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateCustomerTrackingLink = implement(
  dmsContracts.updateCustomerTrackingLinkContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DmsCustomerTrackingLinkRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteCustomerTrackingLink = implement(
  dmsContracts.deleteCustomerTrackingLinkContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DmsCustomerTrackingLinkRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
