import { implement } from '@orpc/server';
import * as tmsContracts from '@/orpc/contracts/tms';
import { TmsDriverScheduleRepository } from '@/repositories/tms/driverSchedules';
import { HonoVariables } from '@/server';

export const paginateDriverSchedule = implement(
  tmsContracts.paginateDriverScheduleContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsDriverScheduleRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeDriverSchedule = implement(
  tmsContracts.rangeDriverScheduleContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsDriverScheduleRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inDriverSchedule = implement(
  tmsContracts.inDriverScheduleContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsDriverScheduleRepository(context.db);

    return repo.in(input).execute();
  });

export const createDriverSchedule = implement(
  tmsContracts.createDriverScheduleContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsDriverScheduleRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateDriverSchedule = implement(
  tmsContracts.updateDriverScheduleContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsDriverScheduleRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteDriverSchedule = implement(
  tmsContracts.deleteDriverScheduleContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TmsDriverScheduleRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
