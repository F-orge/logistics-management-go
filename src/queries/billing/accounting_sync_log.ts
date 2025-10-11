import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

export const paginateAccountingSyncLog = (
  options: Parameters<typeof orpcClient.billing.paginateAccountingSyncLog>[0],
) =>
  queryOptions({
    queryKey: ['billing.accountingSyncLog', 'paginate', options],
    queryFn: () => orpcClient.billing.paginateAccountingSyncLog(options),
    enabled: !!options,
  });

export const rangeAccountingSyncLog = (
  options: Parameters<typeof orpcClient.billing.rangeAccountingSyncLog>[0],
) =>
  queryOptions({
    queryKey: ['billing.accountingSyncLog', 'range', options],
    queryFn: () => orpcClient.billing.rangeAccountingSyncLog(options),
    enabled: !!options,
  });

export const inAccountingSyncLog = (
  options: Parameters<typeof orpcClient.billing.inAccountingSyncLog>[0],
) =>
  queryOptions({
    queryKey: ['billing.accountingSyncLog', 'in', options],
    queryFn: () => orpcClient.billing.inAccountingSyncLog(options),
    enabled: !!options,
  });

export const createAccountingSyncLog = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.createAccountingSyncLog>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.createAccountingSyncLog>[0]
>({
  mutationFn: (options) => orpcClient.billing.createAccountingSyncLog(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Accounting Sync Log: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.accountingSyncLog'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateAccountingSyncLog = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.updateAccountingSyncLog>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.updateAccountingSyncLog>[0]
>({
  mutationFn: (options) => orpcClient.billing.updateAccountingSyncLog(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Accounting Sync Log: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.accountingSyncLog'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteAccountingSyncLog = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.deleteAccountingSyncLog>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.deleteAccountingSyncLog>[0]
>({
  mutationFn: (options) => orpcClient.billing.deleteAccountingSyncLog(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Accounting Sync Log has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.accountingSyncLog'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
