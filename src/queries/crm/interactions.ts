import { orpcClient } from '@/orpc/client';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

export const paginateInteraction = (
  options: Parameters<typeof orpcClient.crm.paginateInteraction>[0],
) =>
  queryOptions({
    queryKey: ['crm.interactions', options],
    queryFn: () => orpcClient.crm.paginateInteraction(options),
    enabled: !!options,
  });

export const rangeInteraction = (
  options: Parameters<typeof orpcClient.crm.rangeInteraction>[0],
) =>
  queryOptions({
    queryKey: ['crm.interactions', options],
    queryFn: () => orpcClient.crm.rangeInteraction(options),
    enabled: !!options,
  });

export const inInteraction = (
  options: Parameters<typeof orpcClient.crm.inInteraction>[0],
) =>
  queryOptions({
    queryKey: ['crm.interactions', options],
    queryFn: () => orpcClient.crm.inInteraction(options),
    enabled: !!options,
  });

export const createInteraction = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.createInteraction>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.createInteraction>[0]
>({
  mutationFn: (options) => orpcClient.crm.createInteraction(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Interaction: ${data.name} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.interactions'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateInteraction = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.updateInteraction>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.updateInteraction>[0]
>({
  mutationFn: (options) => orpcClient.crm.updateInteraction(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Interaction: ${data.name} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.interactions'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteInteraction = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.deleteInteraction>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.deleteInteraction>[0]
>({
  mutationFn: (options) => orpcClient.crm.deleteInteraction(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `A record has been deleted`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.interactions'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
