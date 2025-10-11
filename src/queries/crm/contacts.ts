import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inCompany } from './companies';
import { inUser } from '../auth/user';

export const paginateContact = (
  options: Parameters<typeof orpcClient.crm.paginateContact>[0],
) =>
  queryOptions({
    queryKey: ['crm.contacts', options],
    queryFn: async ({ client }) => {
      const contacts = await orpcClient.crm.paginateContact(options);

      const companies = await client.ensureQueryData(
        inCompany(contacts.map((row) => row.companyId).filter(nonEmpty)),
      );

      const owners = await client.ensureQueryData(
        inUser(contacts.map((row) => row.ownerId)),
      );

      return contacts.map((row) => ({
        ...row,
        company: companies.find((subRow) => subRow.id === row.companyId),
        owner: owners.find((subRow) => subRow.id === row.ownerId)!,
      }));
    },
    enabled: !!options,
  });

export const rangeContact = (
  options: Parameters<typeof orpcClient.crm.rangeContact>[0],
) =>
  queryOptions({
    queryKey: ['crm.contacts', options],
    queryFn: () => orpcClient.crm.rangeContact(options),
    enabled: !!options,
  });

export const inContact = (
  options: Parameters<typeof orpcClient.crm.inContact>[0],
) =>
  queryOptions({
    queryKey: ['crm.contacts', options],
    queryFn: () =>
      options.length >= 1 ? orpcClient.crm.inContact(options) : [],
    enabled: !!options,
  });

export const createContact = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.createContact>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.createContact>[0]
>({
  mutationFn: (options) => orpcClient.crm.createContact(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Contact: ${data.name} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.contacts'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateContact = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.updateContact>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.updateContact>[0]
>({
  mutationFn: (options) => orpcClient.crm.updateContact(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Contact: ${data.name} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.contacts'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteContact = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.deleteContact>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.deleteContact>[0]
>({
  mutationFn: (options) => orpcClient.crm.deleteContact(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `A record has been deleted`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.contacts'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
