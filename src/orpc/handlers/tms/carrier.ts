import { implement } from '@orpc/server';
import * as tmsContracts from '@/orpc/contracts/tms/carrier';
import { CarrierRepository } from '@/repositories/tms/carriers';
import { HonoVariables } from '@/server';

export const paginateCarrier = implement(tmsContracts.paginateCarrierContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CarrierRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeCarrier = implement(tmsContracts.rangeCarrierContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CarrierRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inCarrier = implement(tmsContracts.inCarrierContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CarrierRepository(context.db);

    return repo.in(input).execute();
  });

export const createCarrier = implement(tmsContracts.createCarrierContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CarrierRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateCarrier = implement(tmsContracts.updateCarrierContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CarrierRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteCarrier = implement(tmsContracts.deleteCarrierContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CarrierRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
