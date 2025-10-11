import { implement } from '@orpc/server';
import * as wmsContracts from '@/orpc/contracts/wms/inventory_adjustment';
import { InventoryAdjustmentRepository } from '@/repositories/wms/inventoryAdjustments';
import { HonoVariables } from '@/server';

export const paginateInventoryAdjustment = implement(
  wmsContracts.paginateInventoryAdjustmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InventoryAdjustmentRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeInventoryAdjustment = implement(
  wmsContracts.rangeInventoryAdjustmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InventoryAdjustmentRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inInventoryAdjustment = implement(
  wmsContracts.inInventoryAdjustmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InventoryAdjustmentRepository(context.db);

    return repo.in(input).execute();
  });

export const createInventoryAdjustment = implement(
  wmsContracts.createInventoryAdjustmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InventoryAdjustmentRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateInventoryAdjustment = implement(
  wmsContracts.updateInventoryAdjustmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InventoryAdjustmentRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteInventoryAdjustment = implement(
  wmsContracts.deleteInventoryAdjustmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InventoryAdjustmentRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
