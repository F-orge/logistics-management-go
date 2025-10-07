import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createBillingSurcharge,
  removeBillingSurcharge,
  selectBillingSurcharge,
  updateBillingSurcharge,
} from '@/actions/billing/surcharges';
import {
  billingSurchargeInsertSchema,
  billingSurchargeSchema,
  billingSurchargeUpdateSchema,
} from '@/schemas/billing/surcharge';

export const billingSurchargeQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['billing.surcharges', page, perPage],
    queryFn: () =>
      selectBillingSurcharge({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const billingSurchargeCreateMutationOption = mutationOptions<
  z.infer<typeof billingSurchargeSchema>,
  void,
  z.infer<typeof billingSurchargeInsertSchema>
>({
  mutationFn: (value) => createBillingSurcharge({ data: value }),
});

export const billingSurchargeUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof billingSurchargeSchema>,
    void,
    z.infer<typeof billingSurchargeUpdateSchema>
  >({
    mutationFn: (value) => updateBillingSurcharge({ data: { id, value } }),
  });

export const billingSurchargeRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeBillingSurcharge({ data: { id } }),
});
