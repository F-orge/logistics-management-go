import { implement } from '@orpc/server';
import * as wmsContracts from '@/orpc/contracts/wms/pick_batch_item';
import { PickBatchItemRepository } from '@/repositories/wms/pickBatchItems';
import { HonoVariables } from '@/server';

export const paginatePickBatchItem = implement(
  wmsContracts.paginatePickBatchItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PickBatchItemRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangePickBatchItem = implement(
  wmsContracts.rangePickBatchItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PickBatchItemRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inPickBatchItem = implement(wmsContracts.inPickBatchItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PickBatchItemRepository(context.db);

    return repo.in(input).execute();
  });

export const createPickBatchItem = implement(
  wmsContracts.createPickBatchItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PickBatchItemRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updatePickBatchItem = implement(
  wmsContracts.updatePickBatchItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PickBatchItemRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deletePickBatchItem = implement(
  wmsContracts.deletePickBatchItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PickBatchItemRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
