import { implement } from '@orpc/server';
import * as wmsContracts from '@/orpc/contracts/wms/stock_transfer';
import { StockTransferRepository } from '@/repositories/wms/stockTransfers';
import { HonoVariables } from '@/server';

export const paginateStockTransfer = implement(
  wmsContracts.paginateStockTransferContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new StockTransferRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeStockTransfer = implement(
  wmsContracts.rangeStockTransferContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new StockTransferRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inStockTransfer = implement(wmsContracts.inStockTransferContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new StockTransferRepository(context.db);

    return repo.in(input).execute();
  });

export const createStockTransfer = implement(
  wmsContracts.createStockTransferContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new StockTransferRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateStockTransfer = implement(
  wmsContracts.updateStockTransferContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new StockTransferRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteStockTransfer = implement(
  wmsContracts.deleteStockTransferContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new StockTransferRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
