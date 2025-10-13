import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  tmsProofOfDeliveryInsertSchema,
  tmsProofOfDeliverySchema,
  tmsProofOfDeliveryUpdateSchema,
} from '@/schemas/tms/proof_of_delivery';

export const paginateProofOfDeliveryContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(tmsProofOfDeliverySchema),
        sort: sortTransformer(tmsProofOfDeliverySchema),
      }),
    ),
  )
  .output(z.array(tmsProofOfDeliverySchema));

export const rangeProofOfDeliveryContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(tmsProofOfDeliverySchema),
        sort: sortTransformer(tmsProofOfDeliverySchema),
      }),
    ),
  )
  .output(z.array(tmsProofOfDeliverySchema));

export const inProofOfDeliveryContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(tmsProofOfDeliverySchema));

export const createProofOfDeliveryContract = oc
  .input(tmsProofOfDeliveryInsertSchema)
  .output(tmsProofOfDeliverySchema);

export const updateProofOfDeliveryContract = oc
  .input(z.object({ id: z.uuid(), value: tmsProofOfDeliveryUpdateSchema }))
  .output(tmsProofOfDeliverySchema);

export const deleteProofOfDeliveryContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
