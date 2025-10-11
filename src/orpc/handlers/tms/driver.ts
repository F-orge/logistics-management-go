import { implement } from '@orpc/server';
import * as tmsContracts from '@/orpc/contracts/tms/driver';
import { DriverRepository } from '@/repositories/tms/drivers';
import { HonoVariables } from '@/server';

export const paginateDriver = implement(tmsContracts.paginateDriverContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DriverRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeDriver = implement(tmsContracts.rangeDriverContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DriverRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inDriver = implement(tmsContracts.inDriverContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DriverRepository(context.db);

    return repo.in(input).execute();
  });

export const createDriver = implement(tmsContracts.createDriverContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DriverRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateDriver = implement(tmsContracts.updateDriverContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DriverRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteDriver = implement(tmsContracts.deleteDriverContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DriverRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
