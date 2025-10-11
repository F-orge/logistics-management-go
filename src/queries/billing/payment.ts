import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

import { nonEmpty } from '@/lib/utils';
import { inInvoice } from './invoice';
import { inUser } from '@/queries/auth/user';

export const paginatePayment = (
  options: Parameters<typeof orpcClient.billing.paginatePayment>[0],
) =>
  queryOptions({
    queryKey: ['billing.payment', 'paginate', options],
    queryFn: async ({ client }) => {
      const payments = await orpcClient.billing.paginatePayment(options);

      const invoices = await client.ensureQueryData(
        inInvoice(payments.map((row) => row.invoiceId).filter(nonEmpty)),
      );
      const processedByUsers = await client.ensureQueryData(
        inUser(payments.map((row) => row.processedByUserId).filter(nonEmpty)),
      );

      return payments.map((row) => ({
        ...row,
        invoice: invoices.find((subRow) => subRow.id === row.invoiceId),
        processedByUser: processedByUsers.find((subRow) => subRow.id === row.processedByUserId),
      }));
    },
    enabled: !!options,
  });

export const rangePayment = (
  options: Parameters<typeof orpcClient.billing.rangePayment>[0],
) =>
  queryOptions({
    queryKey: ['billing.payment', 'range', options],
    queryFn: () => orpcClient.billing.rangePayment(options),
    enabled: !!options,
  });

export const inPayment = (
  options: Parameters<typeof orpcClient.billing.inPayment>[0],
) =>
  queryOptions({
    queryKey: ['billing.payment', 'in', options],
    queryFn: () => orpcClient.billing.inPayment(options),
    enabled: !!options,
  });

export const createPayment = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.createPayment>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.createPayment>[0]
>({
  mutationFn: (options) => orpcClient.billing.createPayment(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Payment: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.payment'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updatePayment = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.updatePayment>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.updatePayment>[0]
>({
  mutationFn: (options) => orpcClient.billing.updatePayment(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Payment: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.payment'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deletePayment = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.deletePayment>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.deletePayment>[0]
>({
  mutationFn: (options) => orpcClient.billing.deletePayment(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Payment has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.payment'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
