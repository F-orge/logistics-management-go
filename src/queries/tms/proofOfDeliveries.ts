import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createTmsProofOfDelivery,
  removeTmsProofOfDelivery,
  selectTmsProofOfDelivery,
  updateTmsProofOfDelivery,
} from '@/actions/tms/proofOfDeliveries';
import {
  tmsProofOfDeliveryInsertSchema,
  tmsProofOfDeliverySchema,
  tmsProofOfDeliveryUpdateSchema,
} from '@/schemas/tms/proof_of_delivery';

export const tmsProofOfDeliveryQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['tms.proofOfDeliveries', page, perPage],
    queryFn: () =>
      selectTmsProofOfDelivery({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const tmsProofOfDeliveryCreateMutationOption = mutationOptions<
  z.infer<typeof tmsProofOfDeliverySchema>,
  void,
  z.infer<typeof tmsProofOfDeliveryInsertSchema>
>({
  mutationFn: (value) => createTmsProofOfDelivery({ data: value }),
});

export const tmsProofOfDeliveryUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof tmsProofOfDeliverySchema>,
    void,
    z.infer<typeof tmsProofOfDeliveryUpdateSchema>
  >({
    mutationFn: (value) => updateTmsProofOfDelivery({ data: { id, value } }),
  });

export const tmsProofOfDeliveryRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeTmsProofOfDelivery({ data: { id } }),
});