import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createTmsCarrier,
  removeTmsCarrier,
  selectTmsCarrier,
  updateTmsCarrier,
} from '@/actions/tms/carriers';
import {
  tmsCarrierInsertSchema,
  tmsCarrierSchema,
  tmsCarrierUpdateSchema,
} from '@/schemas/tms/carrier';

export const tmsCarrierQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['tms.carriers', page, perPage],
    queryFn: () =>
      selectTmsCarrier({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const tmsCarrierCreateMutationOption = mutationOptions<
  z.infer<typeof tmsCarrierSchema>,
  void,
  z.infer<typeof tmsCarrierInsertSchema>
>({
  mutationFn: (value) => createTmsCarrier({ data: value }),
});

export const tmsCarrierUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof tmsCarrierSchema>,
    void,
    z.infer<typeof tmsCarrierUpdateSchema>
  >({
    mutationFn: (value) => updateTmsCarrier({ data: { id, value } }),
  });

export const tmsCarrierRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeTmsCarrier({ data: { id } }),
});