import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createWmsPackage,
  removeWmsPackage,
  selectWmsPackages,
  updateWmsPackage,
} from '@/actions/wms/packages';
import {
  wmsPackageInsertSchema,
  wmsPackageSchema,
  wmsPackageUpdateSchema,
} from '@/schemas/wms/package';

export const wmsPackageQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.packages', page, perPage],
    queryFn: () =>
      selectWmsPackages({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsPackageCreateMutationOption = mutationOptions<
  z.infer<typeof wmsPackageSchema>,
  void,
  z.infer<typeof wmsPackageInsertSchema>
>({
  mutationFn: (value) => createWmsPackage({ data: value }),
});

export const wmsPackageUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsPackageSchema>,
    void,
    z.infer<typeof wmsPackageUpdateSchema>
  >({
    mutationFn: (value) => updateWmsPackage({ data: { id, value } }),
  });

export const wmsPackageRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsPackage({ data: { id } }),
});
