import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsStockTransferRepository } from '@/repositories/wms/stockTransfers';
import {
  wmsStockTransferInsertSchema,
  wmsStockTransferSchema,
  wmsStockTransferUpdateSchema,
} from '@/schemas/wms/stock_transfer';

export const selectWmsStockTransfers = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsStockTransferSchema))
  .handler(async ({ data }) => {
    const stockTransferRepository = new WmsStockTransferRepository(kyselyDb);

    const result = await stockTransferRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.stockTransfers'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.stockTransfers', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsStockTransferSchema.array().parseAsync(result);
  });

export const createWmsStockTransfer = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsStockTransferInsertSchema)
  .handler(async ({ data }) => {
    const stockTransferRepository = new WmsStockTransferRepository(kyselyDb);

    const result = await stockTransferRepository.create(data).executeTakeFirst();

    return wmsStockTransferSchema.parseAsync(result);
  });

export const updateWmsStockTransfer = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsStockTransferUpdateSchema }))
  .handler(async ({ data }) => {
    const stockTransferRepository = new WmsStockTransferRepository(kyselyDb);

    const result = await stockTransferRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsStockTransferSchema.parseAsync(result);
  });

export const removeWmsStockTransfer = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const stockTransferRepository = new WmsStockTransferRepository(kyselyDb);

    const result = await stockTransferRepository.delete(data.id).executeTakeFirst();

    return result;
  });
