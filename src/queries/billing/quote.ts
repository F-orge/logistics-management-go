import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

import { nonEmpty } from '@/lib/utils';
import { inUser } from '@/queries/auth/user';

export const paginateQuote = (
  options: Parameters<typeof orpcClient.billing.paginateQuote>[0],
) =>
  queryOptions({
    queryKey: ['billing.quote', 'paginate', options],
    queryFn: async ({ client }) => {
      const quotes = await orpcClient.billing.paginateQuote(options);

      const createdByUsers = await client.ensureQueryData(
        inUser(quotes.map((row) => row.createdByUserId).filter(nonEmpty)),
      );

      return quotes.map((row) => ({
        ...row,
        createdByUser: createdByUsers.find((subRow) => subRow.id === row.createdByUserId),
      }));
    },
    enabled: !!options,
  });

export const rangeQuote = (
  options: Parameters<typeof orpcClient.billing.rangeQuote>[0],
) =>
  queryOptions({
    queryKey: ['billing.quote', 'range', options],
    queryFn: () => orpcClient.billing.rangeQuote(options),
    enabled: !!options,
  });

export const inQuote = (
  options: Parameters<typeof orpcClient.billing.inQuote>[0],
) =>
  queryOptions({
    queryKey: ['billing.quote', 'in', options],
    queryFn: () => orpcClient.billing.inQuote(options),
    enabled: !!options,
  });

export const createQuote = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.createQuote>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.createQuote>[0]
>({
  mutationFn: (options) => orpcClient.billing.createQuote(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Quote: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.quote'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateQuote = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.updateQuote>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.updateQuote>[0]
>({
  mutationFn: (options) => orpcClient.billing.updateQuote(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Quote: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.quote'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteQuote = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.deleteQuote>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.deleteQuote>[0]
>({
  mutationFn: (options) => orpcClient.billing.deleteQuote(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Quote has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.quote'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
