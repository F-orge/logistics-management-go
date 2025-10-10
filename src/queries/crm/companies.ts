import { orpcClient } from '@/orpc/client';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

export const paginateCompany = (
  options: Parameters<typeof orpcClient.crm.paginateCompany>[0],
) =>
  queryOptions({
    queryKey: ['crm.companies', options],
    queryFn: () => orpcClient.crm.paginateCompany(options),
    enabled: !!options,
  });

export const rangeCompany = (
  options: Parameters<typeof orpcClient.crm.rangeCompany>[0],
) =>
  queryOptions({
    queryKey: ['crm.companies', options],
    queryFn: () => orpcClient.crm.rangeCompany(options),
    enabled: !!options,
  });

export const inCompany = (
  options: Parameters<typeof orpcClient.crm.inCompany>[0],
) =>
  queryOptions({
    queryKey: ['crm.companies', options],
    queryFn: () => orpcClient.crm.inCompany(options),
    enabled: !!options,
  });

export const createCompany = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.createCompany>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.createCompany>[0]
>({
  mutationFn: (options) => orpcClient.crm.createCompany(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Company: ${data.name} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.companies'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateCompany = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.updateCompany>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.updateCompany>[0]
>({
  mutationFn: (options) => orpcClient.crm.updateCompany(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Company: ${data.name} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.companies'] });
  },
});

export const deleteCompany = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.deleteCompany>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.deleteCompany>[0]
>({
  mutationFn: (options) => orpcClient.crm.deleteCompany(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `A record has been deleted`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.companies'] });
  },
});
