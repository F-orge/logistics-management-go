import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

import { nonEmpty } from '@/lib/utils';
import { inClientAccount } from './client_account';
import { inUser } from '@/queries/auth/user';

export const paginateAccountTransaction = (
  options: Parameters<typeof orpcClient.billing.paginateAccountTransaction>[0],
) =>
  queryOptions({
    queryKey: ['billing.accountTransaction', 'paginate', options],
    queryFn: async ({ client }) => {
      const accountTransactions = await orpcClient.billing.paginateAccountTransaction(options);

      const clientAccounts = await client.ensureQueryData(
        inClientAccount(accountTransactions.map((row) => row.clientAccountId).filter(nonEmpty)),
      );
      const processedByUsers = await client.ensureQueryData(
        inUser(accountTransactions.map((row) => row.processedByUserId).filter(nonEmpty)),
      );

      return accountTransactions.map((row) => ({
        ...row,
        clientAccount: clientAccounts.find((subRow) => subRow.id === row.clientAccountId),
        processedByUser: processedByUsers.find((subRow) => subRow.id === row.processedByUserId),
      }));
    },
    enabled: !!options,
  });

export const rangeAccountTransaction = (
  options: Parameters<typeof orpcClient.billing.rangeAccountTransaction>[0],
) =>
  queryOptions({
    queryKey: ['billing.accountTransaction', 'range', options],
    queryFn: () => orpcClient.billing.rangeAccountTransaction(options),
    enabled: !!options,
  });

export const inAccountTransaction = (
  options: Parameters<typeof orpcClient.billing.inAccountTransaction>[0],
) =>
  queryOptions({
    queryKey: ['billing.accountTransaction', 'in', options],
    queryFn: () => orpcClient.billing.inAccountTransaction(options),
    enabled: !!options,
  });

export const createAccountTransaction = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.createAccountTransaction>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.createAccountTransaction>[0]
>({
  mutationFn: (options) => orpcClient.billing.createAccountTransaction(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Account Transaction: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.accountTransaction'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateAccountTransaction = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.updateAccountTransaction>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.updateAccountTransaction>[0]
>({
  mutationFn: (options) => orpcClient.billing.updateAccountTransaction(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Account Transaction: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.accountTransaction'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteAccountTransaction = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.deleteAccountTransaction>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.deleteAccountTransaction>[0]
>({
  mutationFn: (options) => orpcClient.billing.deleteAccountTransaction(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Account Transaction has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.accountTransaction'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
