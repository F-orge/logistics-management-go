import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createWmsStockTransfer,
  removeWmsStockTransfer,
  selectWmsStockTransfers,
  updateWmsStockTransfer,
} from '@/actions/wms/stockTransfers';
import {
  wmsStockTransferInsertSchema,
  wmsStockTransferSchema,
  wmsStockTransferUpdateSchema,
} from '@/schemas/wms/stock_transfer';

export const wmsStockTransferQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.stockTransfers', page, perPage],
    queryFn: () =>
      selectWmsStockTransfers({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsStockTransferCreateMutationOption = mutationOptions<
  z.infer<typeof wmsStockTransferSchema>,
  void,
  z.infer<typeof wmsStockTransferInsertSchema>
>({
  mutationFn: (value) => createWmsStockTransfer({ data: value }),
});

export const wmsStockTransferUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsStockTransferSchema>,
    void,
    z.infer<typeof wmsStockTransferUpdateSchema>
  >({
    mutationFn: (value) => updateWmsStockTransfer({ data: { id, value } }),
  });

export const wmsStockTransferRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsStockTransfer({ data: { id } }),
});