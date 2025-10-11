import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

import { nonEmpty } from '@/lib/utils';
import { inUser } from '@/queries/auth/user';
import { inQuote } from './quote';

export const paginateInvoice = (
  options: Parameters<typeof orpcClient.billing.paginateInvoice>[0],
) =>
  queryOptions({
    queryKey: ['billing.invoice', 'paginate', options],
    queryFn: async ({ client }) => {
      const invoices = await orpcClient.billing.paginateInvoice(options);

      const createdByUsers = await client.ensureQueryData(
        inUser(invoices.map((row) => row.createdByUserId).filter(nonEmpty)),
      );
      const quotes = await client.ensureQueryData(
        inQuote(invoices.map((row) => row.quoteId).filter(nonEmpty)),
      );

      return invoices.map((row) => ({
        ...row,
        createdByUser: createdByUsers.find((subRow) => subRow.id === row.createdByUserId),
        quote: quotes.find((subRow) => subRow.id === row.quoteId),
      }));
    },
    enabled: !!options,
  });

export const rangeInvoice = (
  options: Parameters<typeof orpcClient.billing.rangeInvoice>[0],
) =>
  queryOptions({
    queryKey: ['billing.invoice', 'range', options],
    queryFn: () => orpcClient.billing.rangeInvoice(options),
    enabled: !!options,
  });

export const inInvoice = (
  options: Parameters<typeof orpcClient.billing.inInvoice>[0],
) =>
  queryOptions({
    queryKey: ['billing.invoice', 'in', options],
    queryFn: () => orpcClient.billing.inInvoice(options),
    enabled: !!options,
  });

export const createInvoice = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.createInvoice>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.createInvoice>[0]
>({
  mutationFn: (options) => orpcClient.billing.createInvoice(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Invoice: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.invoice'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateInvoice = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.updateInvoice>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.updateInvoice>[0]
>({
  mutationFn: (options) => orpcClient.billing.updateInvoice(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Invoice: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.invoice'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteInvoice = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.deleteInvoice>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.deleteInvoice>[0]
>({
  mutationFn: (options) => orpcClient.billing.deleteInvoice(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Invoice has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.invoice'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
