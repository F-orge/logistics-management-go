import { implement } from '@orpc/server';
import * as wmsContracts from '@/orpc/contracts/wms/pick_batch';
import { PickBatchRepository } from '@/repositories/wms/pickBatches';
import { HonoVariables } from '@/server';

export const paginatePickBatch = implement(
  wmsContracts.paginatePickBatchContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PickBatchRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangePickBatch = implement(wmsContracts.rangePickBatchContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PickBatchRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inPickBatch = implement(wmsContracts.inPickBatchContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PickBatchRepository(context.db);

    return repo.in(input).execute();
  });

export const createPickBatch = implement(wmsContracts.createPickBatchContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PickBatchRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updatePickBatch = implement(wmsContracts.updatePickBatchContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PickBatchRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deletePickBatch = implement(wmsContracts.deletePickBatchContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PickBatchRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
