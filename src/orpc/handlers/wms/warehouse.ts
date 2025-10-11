import { implement } from '@orpc/server';
import * as wmsContracts from '@/orpc/contracts/wms/warehouse';
import { WarehouseRepository } from '@/repositories/wms/warehouses';
import { HonoVariables } from '@/server';

export const paginateWarehouse = implement(
  wmsContracts.paginateWarehouseContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WarehouseRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeWarehouse = implement(wmsContracts.rangeWarehouseContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WarehouseRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inWarehouse = implement(wmsContracts.inWarehouseContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WarehouseRepository(context.db);

    return repo.in(input).execute();
  });

export const createWarehouse = implement(wmsContracts.createWarehouseContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WarehouseRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateWarehouse = implement(wmsContracts.updateWarehouseContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WarehouseRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteWarehouse = implement(wmsContracts.deleteWarehouseContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WarehouseRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
