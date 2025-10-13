import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  billingClientAccountInsertSchema,
  billingClientAccountSchema,
  billingClientAccountUpdateSchema,
} from '@/schemas/billing/client_account';

export const paginateClientAccountContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(billingClientAccountSchema),
        sort: sortTransformer(billingClientAccountSchema),
      }),
    ),
  )
  .output(z.array(billingClientAccountSchema));

export const rangeClientAccountContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(billingClientAccountSchema),
        sort: sortTransformer(billingClientAccountSchema),
      }),
    ),
  )
  .output(z.array(billingClientAccountSchema));

export const inClientAccountContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(billingClientAccountSchema));

export const createClientAccountContract = oc
  .input(billingClientAccountInsertSchema)
  .output(billingClientAccountSchema);

export const updateClientAccountContract = oc
  .input(z.object({ id: z.uuid(), value: billingClientAccountUpdateSchema }))
  .output(billingClientAccountSchema);

export const deleteClientAccountContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
