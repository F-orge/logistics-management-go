import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  wmsPackageItemInsertSchema,
  wmsPackageItemSchema,
  wmsPackageItemUpdateSchema,
} from '@/schemas/wms/package_item';

export const paginatePackageItemContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsPackageItemSchema),
        sort: sortTransformer(wmsPackageItemSchema),
      }),
    ),
  )
  .output(z.array(wmsPackageItemSchema));

export const rangePackageItemContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsPackageItemSchema),
        sort: sortTransformer(wmsPackageItemSchema),
      }),
    ),
  )
  .output(z.array(wmsPackageItemSchema));

export const inPackageItemContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsPackageItemSchema));

export const createPackageItemContract = oc
  .input(wmsPackageItemInsertSchema)
  .output(wmsPackageItemSchema);

export const updatePackageItemContract = oc
  .input(z.object({ id: z.uuid(), value: wmsPackageItemUpdateSchema }))
  .output(wmsPackageItemSchema);

export const deletePackageItemContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
