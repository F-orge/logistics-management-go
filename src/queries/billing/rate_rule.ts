import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

import { nonEmpty } from '@/lib/utils';
import { inRateCard } from './rate_card';

export const paginateRateRule = (
  options: Parameters<typeof orpcClient.billing.paginateRateRule>[0],
) =>
  queryOptions({
    queryKey: ['billing.rateRule', 'paginate', options],
    queryFn: async ({ client }) => {
      const rateRules = await orpcClient.billing.paginateRateRule(options);

      const rateCards = await client.ensureQueryData(
        inRateCard(rateRules.map((row) => row.rateCardId).filter(nonEmpty)),
      );

      return rateRules.map((row) => ({
        ...row,
        rateCard: rateCards.find((subRow) => subRow.id === row.rateCardId),
      }));
    },
    enabled: !!options,
  });

export const rangeRateRule = (
  options: Parameters<typeof orpcClient.billing.rangeRateRule>[0],
) =>
  queryOptions({
    queryKey: ['billing.rateRule', 'range', options],
    queryFn: () => orpcClient.billing.rangeRateRule(options),
    enabled: !!options,
  });

export const inRateRule = (
  options: Parameters<typeof orpcClient.billing.inRateRule>[0],
) =>
  queryOptions({
    queryKey: ['billing.rateRule', 'in', options],
    queryFn: () => orpcClient.billing.inRateRule(options),
    enabled: !!options,
  });

export const createRateRule = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.createRateRule>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.createRateRule>[0]
>({
  mutationFn: (options) => orpcClient.billing.createRateRule(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Rate Rule: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.rateRule'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateRateRule = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.updateRateRule>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.updateRateRule>[0]
>({
  mutationFn: (options) => orpcClient.billing.updateRateRule(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Rate Rule: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.rateRule'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteRateRule = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.deleteRateRule>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.deleteRateRule>[0]
>({
  mutationFn: (options) => orpcClient.billing.deleteRateRule(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Rate Rule has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.rateRule'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
