import { implement } from '@orpc/server';
import * as wmsContracts from '@/orpc/contracts/wms/inventory_stock';
import { InventoryStockRepository } from '@/repositories/wms/inventoryStocks';
import { HonoVariables } from '@/server';

export const paginateInventoryStock = implement(
  wmsContracts.paginateInventoryStockContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InventoryStockRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeInventoryStock = implement(
  wmsContracts.rangeInventoryStockContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InventoryStockRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inInventoryStock = implement(wmsContracts.inInventoryStockContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InventoryStockRepository(context.db);

    return repo.in(input).execute();
  });

export const createInventoryStock = implement(
  wmsContracts.createInventoryStockContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InventoryStockRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateInventoryStock = implement(
  wmsContracts.updateInventoryStockContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InventoryStockRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteInventoryStock = implement(
  wmsContracts.deleteInventoryStockContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InventoryStockRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
