import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createWmsSupplier,
  removeWmsSupplier,
  selectWmsSuppliers,
  updateWmsSupplier,
} from '@/actions/wms/suppliers';
import {
  wmsSupplierInsertSchema,
  wmsSupplierSchema,
  wmsSupplierUpdateSchema,
} from '@/schemas/wms/supplier';

export const wmsSupplierQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.suppliers', page, perPage],
    queryFn: () =>
      selectWmsSuppliers({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsSupplierCreateMutationOption = mutationOptions<
  z.infer<typeof wmsSupplierSchema>,
  void,
  z.infer<typeof wmsSupplierInsertSchema>
>({
  mutationFn: (value) => createWmsSupplier({ data: value }),
});

export const wmsSupplierUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsSupplierSchema>,
    void,
    z.infer<typeof wmsSupplierUpdateSchema>
  >({
    mutationFn: (value) => updateWmsSupplier({ data: { id, value } }),
  });

export const wmsSupplierRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsSupplier({ data: { id } }),
});