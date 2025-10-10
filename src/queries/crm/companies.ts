import { orpcClient } from '@/orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';

export const paginateCompany = (
  options: Parameters<typeof orpcClient.crm.paginateCompany>[0],
) =>
  queryOptions({
    queryKey: ['crm.companies', options],
    queryFn: () => orpcClient.crm.paginateCompany(options),
  });

export const rangeCompany = (
  options: Parameters<typeof orpcClient.crm.rangeCompany>[0],
) =>
  queryOptions({
    queryKey: ['crm.companies', options],
    queryFn: () => orpcClient.crm.rangeCompany(options),
  });

export const inCompany = (
  options: Parameters<typeof orpcClient.crm.inCompany>[0],
) =>
  queryOptions({
    queryKey: ['crm.companies', options],
    queryFn: () => orpcClient.crm.inCompany(options),
  });

export const createCompany = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.createCompany>>,
  Error,
  Parameters<typeof orpcClient.crm.createCompany>[0]
>({
  mutationFn: (options) => orpcClient.crm.createCompany(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    await context.client.invalidateQueries({ queryKey: ['crm.companies'] });
  },
});

export const updateCompany = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.updateCompany>>,
  Error,
  Parameters<typeof orpcClient.crm.updateCompany>[0]
>({
  mutationFn: (options) => orpcClient.crm.updateCompany(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    await context.client.invalidateQueries({ queryKey: ['crm.companies'] });
  },
});

export const deleteCompany = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.deleteCompany>>,
  Error,
  Parameters<typeof orpcClient.crm.deleteCompany>[0]
>({
  mutationFn: (options) => orpcClient.crm.deleteCompany(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    await context.client.invalidateQueries({ queryKey: ['crm.companies'] });
  },
});
