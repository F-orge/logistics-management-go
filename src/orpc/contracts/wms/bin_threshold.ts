import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  wmsBinThresholdInsertSchema,
  wmsBinThresholdSchema,
  wmsBinThresholdUpdateSchema,
} from '@/schemas/wms/bin_threshold';

export const paginateBinThresholdContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsBinThresholdSchema),
        sort: sortTransformer(wmsBinThresholdSchema),
      }),
    ),
  )
  .output(z.array(wmsBinThresholdSchema));

export const rangeBinThresholdContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsBinThresholdSchema),
        sort: sortTransformer(wmsBinThresholdSchema),
      }),
    ),
  )
  .output(z.array(wmsBinThresholdSchema));

export const inBinThresholdContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsBinThresholdSchema));

export const createBinThresholdContract = oc
  .input(wmsBinThresholdInsertSchema)
  .output(wmsBinThresholdSchema);

export const updateBinThresholdContract = oc
  .input(z.object({ id: z.uuid(), value: wmsBinThresholdUpdateSchema }))
  .output(wmsBinThresholdSchema);

export const deleteBinThresholdContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
