import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createBillingAccountingSyncLog,
  removeBillingAccountingSyncLog,
  selectBillingAccountingSyncLog,
  updateBillingAccountingSyncLog,
} from '@/actions/billing/accountingSyncLogs';
import {
  billingAccountingSyncLogInsertSchema,
  billingAccountingSyncLogSchema,
  billingAccountingSyncLogUpdateSchema,
} from '@/schemas/billing/accounting_sync_log';

export const billingAccountingSyncLogQueryOption = (
  page: number,
  perPage: number,
) =>
  queryOptions({
    queryKey: ['billing.accountingSyncLogs', page, perPage],
    queryFn: () =>
      selectBillingAccountingSyncLog({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const billingAccountingSyncLogCreateMutationOption = mutationOptions<
  z.infer<typeof billingAccountingSyncLogSchema>,
  void,
  z.infer<typeof billingAccountingSyncLogInsertSchema>
>({
  mutationFn: (value) => createBillingAccountingSyncLog({ data: value }),
});

export const billingAccountingSyncLogUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof billingAccountingSyncLogSchema>,
    void,
    z.infer<typeof billingAccountingSyncLogUpdateSchema>
  >({
    mutationFn: (value) =>
      updateBillingAccountingSyncLog({ data: { id, value } }),
  });

export const billingAccountingSyncLogRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeBillingAccountingSyncLog({ data: { id } }),
});
