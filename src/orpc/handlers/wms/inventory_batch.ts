import { implement } from '@orpc/server';
import * as wmsContracts from '@/orpc/contracts/wms';
import { WmsInventoryBatchRepository } from '@/repositories/wms/inventoryBatches';
import { HonoVariables } from '@/server';

export const paginateInventoryBatch = implement(
  wmsContracts.paginateInventoryBatchContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsInventoryBatchRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeInventoryBatch = implement(
  wmsContracts.rangeInventoryBatchContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsInventoryBatchRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inInventoryBatch = implement(
  wmsContracts.inInventoryBatchContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsInventoryBatchRepository(context.db);

    return repo.in(input).execute();
  });

export const createInventoryBatch = implement(
  wmsContracts.createInventoryBatchContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsInventoryBatchRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateInventoryBatch = implement(
  wmsContracts.updateInventoryBatchContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsInventoryBatchRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteInventoryBatch = implement(
  wmsContracts.deleteInventoryBatchContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsInventoryBatchRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
