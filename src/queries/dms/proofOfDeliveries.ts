import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createDmsProofOfDelivery,
  removeDmsProofOfDelivery,
  selectDmsProofOfDelivery,
  updateDmsProofOfDelivery,
} from '@/actions/dms/proofOfDeliveries';
import {
  dmsProofOfDeliveryInsertSchema,
  dmsProofOfDeliverySchema,
  dmsProofOfDeliveryUpdateSchema,
} from '@/schemas/dms/proof_of_delivery';

export const dmsProofOfDeliveryQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['dms.proofOfDeliveries', page, perPage],
    queryFn: () =>
      selectDmsProofOfDelivery({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const dmsProofOfDeliveryCreateMutationOption = mutationOptions<
  z.infer<typeof dmsProofOfDeliverySchema>,
  void,
  z.infer<typeof dmsProofOfDeliveryInsertSchema>
>({
  mutationFn: (value) => createDmsProofOfDelivery({ data: value }),
});

export const dmsProofOfDeliveryUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof dmsProofOfDeliverySchema>,
    void,
    z.infer<typeof dmsProofOfDeliveryUpdateSchema>
  >({
    mutationFn: (value) => updateDmsProofOfDelivery({ data: { id, value } }),
  });

export const dmsProofOfDeliveryRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeDmsProofOfDelivery({ data: { id } }),
});