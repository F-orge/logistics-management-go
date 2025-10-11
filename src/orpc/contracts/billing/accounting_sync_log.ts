import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  billingAccountingSyncLogInsertSchema,
  billingAccountingSyncLogSchema,
  billingAccountingSyncLogUpdateSchema,
} from '@/schemas/billing/accounting_sync_log';

export const paginateAccountingSyncLogContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(billingAccountingSyncLogSchema),
        sort: sortTransformer(billingAccountingSyncLogSchema),
      }),
    ),
  )
  .output(z.array(billingAccountingSyncLogSchema));

export const rangeAccountingSyncLogContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(billingAccountingSyncLogSchema),
        sort: sortTransformer(billingAccountingSyncLogSchema),
      }),
    ),
  )
  .output(z.array(billingAccountingSyncLogSchema));

export const inAccountingSyncLogContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(billingAccountingSyncLogSchema));

export const createAccountingSyncLogContract = oc
  .input(billingAccountingSyncLogInsertSchema)
  .output(billingAccountingSyncLogSchema);

export const updateAccountingSyncLogContract = oc
  .input(z.object({ id: z.uuid(), value: billingAccountingSyncLogUpdateSchema }))
  .output(billingAccountingSyncLogSchema);

export const deleteAccountingSyncLogContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
