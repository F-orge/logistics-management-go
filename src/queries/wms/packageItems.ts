import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createWmsPackageItem,
  removeWmsPackageItem,
  selectWmsPackageItems,
  updateWmsPackageItem,
} from '@/actions/wms/packageItems';
import {
  wmsPackageItemInsertSchema,
  wmsPackageItemSchema,
  wmsPackageItemUpdateSchema,
} from '@/schemas/wms/package_item';

export const wmsPackageItemQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.packageItems', page, perPage],
    queryFn: () =>
      selectWmsPackageItems({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsPackageItemCreateMutationOption = mutationOptions<
  z.infer<typeof wmsPackageItemSchema>,
  void,
  z.infer<typeof wmsPackageItemInsertSchema>
>({
  mutationFn: (value) => createWmsPackageItem({ data: value }),
});

export const wmsPackageItemUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsPackageItemSchema>,
    void,
    z.infer<typeof wmsPackageItemUpdateSchema>
  >({
    mutationFn: (value) => updateWmsPackageItem({ data: { id, value } }),
  });

export const wmsPackageItemRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsPackageItem({ data: { id } }),
});
