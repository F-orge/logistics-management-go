import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

export const paginateClientAccount = (
  options: Parameters<typeof orpcClient.billing.paginateClientAccount>[0],
) =>
  queryOptions({
    queryKey: ['billing.clientAccount', 'paginate', options],
    queryFn: async ({ client }) => {
      const clientAccounts = await orpcClient.billing.paginateClientAccount(options);

      // No inClient available, so no relations added for clientId

      return clientAccounts.map((row) => ({
        ...row,
      }));
    },
    enabled: !!options,
  });

export const rangeClientAccount = (
  options: Parameters<typeof orpcClient.billing.rangeClientAccount>[0],
) =>
  queryOptions({
    queryKey: ['billing.clientAccount', 'range', options],
    queryFn: () => orpcClient.billing.rangeClientAccount(options),
    enabled: !!options,
  });

export const inClientAccount = (
  options: Parameters<typeof orpcClient.billing.inClientAccount>[0],
) =>
  queryOptions({
    queryKey: ['billing.clientAccount', 'in', options],
    queryFn: () => orpcClient.billing.inClientAccount(options),
    enabled: !!options,
  });

export const createClientAccount = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.createClientAccount>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.createClientAccount>[0]
>({
  mutationFn: (options) => orpcClient.billing.createClientAccount(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Client Account: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.clientAccount'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateClientAccount = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.updateClientAccount>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.updateClientAccount>[0]
>({
  mutationFn: (options) => orpcClient.billing.updateClientAccount(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Client Account: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.clientAccount'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteClientAccount = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.deleteClientAccount>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.deleteClientAccount>[0]
>({
  mutationFn: (options) => orpcClient.billing.deleteClientAccount(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Client Account has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.clientAccount'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
