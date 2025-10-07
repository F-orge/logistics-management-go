import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createWmsBinThreshold,
  removeWmsBinThreshold,
  selectWmsBinThresholds,
  updateWmsBinThreshold,
} from '@/actions/wms/binThresholds';
import {
  wmsBinThresholdInsertSchema,
  wmsBinThresholdSchema,
  wmsBinThresholdUpdateSchema,
} from '@/schemas/wms/bin_threshold';

export const wmsBinThresholdQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.binThresholds', page, perPage],
    queryFn: () =>
      selectWmsBinThresholds({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsBinThresholdCreateMutationOption = mutationOptions<
  z.infer<typeof wmsBinThresholdSchema>,
  void,
  z.infer<typeof wmsBinThresholdInsertSchema>
>({
  mutationFn: (value) => createWmsBinThreshold({ data: value }),
});

export const wmsBinThresholdUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsBinThresholdSchema>,
    void,
    z.infer<typeof wmsBinThresholdUpdateSchema>
  >({
    mutationFn: (value) => updateWmsBinThreshold({ data: { id, value } }),
  });

export const wmsBinThresholdRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsBinThreshold({ data: { id } }),
});
