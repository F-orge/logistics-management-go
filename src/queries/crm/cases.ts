import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inUser } from '../auth/user';
import { inContact } from './contacts';

export const paginateCase = (
  options: Parameters<typeof orpcClient.crm.paginateCase>[0],
) =>
  queryOptions({
    queryKey: ['crm.cases', options],
    queryFn: async ({ client }) => {
      const cases = await orpcClient.crm.paginateCase(options);

      const contacts = await client.ensureQueryData(
        inContact(cases.map((row) => row.contactId).filter(nonEmpty)),
      );

      const owners = await client.ensureQueryData(
        inUser(cases.map((row) => row.ownerId)),
      );

      return cases.map((row) => ({
        ...row,
        contact: contacts.find((subRow) => subRow.id === row.contactId),
        owner: owners.find((subRow) => subRow.id === row.ownerId)!,
      }));
    },
    enabled: !!options,
  });

export const rangeCase = (
  options: Parameters<typeof orpcClient.crm.rangeCase>[0],
) =>
  queryOptions({
    queryKey: ['crm.cases', options],
    queryFn: async () => orpcClient.crm.rangeCase(options),
    enabled: !!options,
  });

export const inCase = (options: Parameters<typeof orpcClient.crm.inCase>[0]) =>
  queryOptions({
    queryKey: ['crm.cases', options],
    queryFn: async () => orpcClient.crm.inCase(options),
    enabled: !!options,
  });

export const createCase = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.createCase>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.createCase>[0]
>({
  mutationFn: (options) => orpcClient.crm.createCase(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Case: ${data.caseNumber} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.cases'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateCase = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.updateCase>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.updateCase>[0]
>({
  mutationFn: (options) => orpcClient.crm.updateCase(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Case: ${data.caseNumber} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.cases'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteCase = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.deleteCase>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.deleteCase>[0]
>({
  mutationFn: (options) => orpcClient.crm.deleteCase(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `A record has been deleted`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.cases'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
