import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createWmsProduct,
  removeWmsProduct,
  selectWmsProducts,
  updateWmsProduct,
} from '@/actions/wms/products';
import {
  wmsProductInsertSchema,
  wmsProductSchema,
  wmsProductUpdateSchema,
} from '@/schemas/wms/product';

export const wmsProductQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.products', page, perPage],
    queryFn: () =>
      selectWmsProducts({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsProductCreateMutationOption = mutationOptions<
  z.infer<typeof wmsProductSchema>,
  void,
  z.infer<typeof wmsProductInsertSchema>
>({
  mutationFn: (value) => createWmsProduct({ data: value }),
});

export const wmsProductUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsProductSchema>,
    void,
    z.infer<typeof wmsProductUpdateSchema>
  >({
    mutationFn: (value) => updateWmsProduct({ data: { id, value } }),
  });

export const wmsProductRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsProduct({ data: { id } }),
});