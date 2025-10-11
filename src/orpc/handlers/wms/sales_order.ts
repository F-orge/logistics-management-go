import { implement } from '@orpc/server';
import * as wmsContracts from '@/orpc/contracts/wms/sales_order';
import { SalesOrderRepository } from '@/repositories/wms/salesOrders';
import { HonoVariables } from '@/server';

export const paginateSalesOrder = implement(
  wmsContracts.paginateSalesOrderContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SalesOrderRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeSalesOrder = implement(wmsContracts.rangeSalesOrderContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SalesOrderRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inSalesOrder = implement(wmsContracts.inSalesOrderContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SalesOrderRepository(context.db);

    return repo.in(input).execute();
  });

export const createSalesOrder = implement(wmsContracts.createSalesOrderContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SalesOrderRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateSalesOrder = implement(wmsContracts.updateSalesOrderContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SalesOrderRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteSalesOrder = implement(wmsContracts.deleteSalesOrderContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SalesOrderRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
