import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  wmsPackageInsertSchema,
  wmsPackageSchema,
  wmsPackageUpdateSchema,
} from '@/schemas/wms/package';

export const paginatePackageContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsPackageSchema),
        sort: sortTransformer(wmsPackageSchema),
      }),
    ),
  )
  .output(z.array(wmsPackageSchema));

export const rangePackageContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsPackageSchema),
        sort: sortTransformer(wmsPackageSchema),
      }),
    ),
  )
  .output(z.array(wmsPackageSchema));

export const inPackageContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsPackageSchema));

export const createPackageContract = oc
  .input(wmsPackageInsertSchema)
  .output(wmsPackageSchema);

export const updatePackageContract = oc
  .input(z.object({ id: z.uuid(), value: wmsPackageUpdateSchema }))
  .output(wmsPackageSchema);

export const deletePackageContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
