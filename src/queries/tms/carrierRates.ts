import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createTmsCarrierRate,
  removeTmsCarrierRate,
  selectTmsCarrierRate,
  updateTmsCarrierRate,
} from '@/actions/tms/carrierRates';
import {
  tmsCarrierRateInsertSchema,
  tmsCarrierRateSchema,
  tmsCarrierRateUpdateSchema,
} from '@/schemas/tms/carrier_rate';

export const tmsCarrierRateQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['tms.carrierRates', page, perPage],
    queryFn: () =>
      selectTmsCarrierRate({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const tmsCarrierRateCreateMutationOption = mutationOptions<
  z.infer<typeof tmsCarrierRateSchema>,
  void,
  z.infer<typeof tmsCarrierRateInsertSchema>
>({
  mutationFn: (value) => createTmsCarrierRate({ data: value }),
});

export const tmsCarrierRateUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof tmsCarrierRateSchema>,
    void,
    z.infer<typeof tmsCarrierRateUpdateSchema>
  >({
    mutationFn: (value) => updateTmsCarrierRate({ data: { id, value } }),
  });

export const tmsCarrierRateRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeTmsCarrierRate({ data: { id } }),
});