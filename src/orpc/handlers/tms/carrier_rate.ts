import { implement } from '@orpc/server';
import * as tmsContracts from '@/orpc/contracts/tms';
import { TmsCarrierRateRepository } from '@/repositories/tms/carrierRates';
import { HonoVariables } from '@/server';

export const paginateCarrierRate = implement(
  tmsContracts.paginateCarrierRateContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsCarrierRateRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeCarrierRate = implement(
  tmsContracts.rangeCarrierRateContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsCarrierRateRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inCarrierRate = implement(
  tmsContracts.inCarrierRateContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsCarrierRateRepository(context.db);

    return repo.in(input).execute();
  });

export const createCarrierRate = implement(
  tmsContracts.createCarrierRateContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsCarrierRateRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateCarrierRate = implement(
  tmsContracts.updateCarrierRateContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsCarrierRateRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteCarrierRate = implement(
  tmsContracts.deleteCarrierRateContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsCarrierRateRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
