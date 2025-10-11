import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

export const paginateSurcharge = (
  options: Parameters<typeof orpcClient.billing.paginateSurcharge>[0],
) =>
  queryOptions({
    queryKey: ['billing.surcharge', 'paginate', options],
    queryFn: () => orpcClient.billing.paginateSurcharge(options),
    enabled: !!options,
  });

export const rangeSurcharge = (
  options: Parameters<typeof orpcClient.billing.rangeSurcharge>[0],
) =>
  queryOptions({
    queryKey: ['billing.surcharge', 'range', options],
    queryFn: () => orpcClient.billing.rangeSurcharge(options),
    enabled: !!options,
  });

export const inSurcharge = (
  options: Parameters<typeof orpcClient.billing.inSurcharge>[0],
) =>
  queryOptions({
    queryKey: ['billing.surcharge', 'in', options],
    queryFn: () => orpcClient.billing.inSurcharge(options),
    enabled: !!options,
  });

export const createSurcharge = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.createSurcharge>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.createSurcharge>[0]
>({
  mutationFn: (options) => orpcClient.billing.createSurcharge(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Surcharge: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.surcharge'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateSurcharge = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.updateSurcharge>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.updateSurcharge>[0]
>({
  mutationFn: (options) => orpcClient.billing.updateSurcharge(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Surcharge: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.surcharge'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteSurcharge = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.deleteSurcharge>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.deleteSurcharge>[0]
>({
  mutationFn: (options) => orpcClient.billing.deleteSurcharge(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Surcharge has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.surcharge'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
