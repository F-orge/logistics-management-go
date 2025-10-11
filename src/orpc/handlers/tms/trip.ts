import { implement } from '@orpc/server';
import * as tmsContracts from '@/orpc/contracts/tms';
import { TmsTripRepository } from '@/repositories/tms/trips';
import { HonoVariables } from '@/server';

export const paginateTrip = implement(tmsContracts.paginateTripContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsTripRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeTrip = implement(tmsContracts.rangeTripContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsTripRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inTrip = implement(tmsContracts.inTripContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsTripRepository(context.db);

    return repo.in(input).execute();
  });

export const createTrip = implement(tmsContracts.createTripContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsTripRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateTrip = implement(tmsContracts.updateTripContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsTripRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteTrip = implement(tmsContracts.deleteTripContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsTripRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
