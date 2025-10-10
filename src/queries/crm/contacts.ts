import { orpcClient } from '@/orpc/client';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

export const paginateContact = (
  options: Parameters<typeof orpcClient.crm.paginateContact>[0],
) =>
  queryOptions({
    queryKey: ['crm.contacts', options],
    queryFn: () => orpcClient.crm.paginateContact(options),
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
    queryFn: () => orpcClient.crm.inContact(options),
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
