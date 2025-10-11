import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

export const paginateCampaign = (
  options: Parameters<typeof orpcClient.crm.paginateCampaign>[0],
) =>
  queryOptions({
    queryKey: ['crm.campaigns', options],
    queryFn: () => orpcClient.crm.paginateCampaign(options),
    enabled: !!options,
  });

export const rangeCampaign = (
  options: Parameters<typeof orpcClient.crm.rangeCampaign>[0],
) =>
  queryOptions({
    queryKey: ['crm.campaigns', options],
    queryFn: () => orpcClient.crm.rangeCampaign(options),
    enabled: !!options,
  });

export const inCampaign = (
  options: Parameters<typeof orpcClient.crm.inCampaign>[0],
) =>
  queryOptions({
    queryKey: ['crm.campaigns', options],
    queryFn: () => orpcClient.crm.inCampaign(options),
    enabled: !!options,
  });

export const createCampaign = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.createCampaign>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.createCampaign>[0]
>({
  mutationFn: (options) => orpcClient.crm.createCampaign(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Campaign: ${data.name} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.campaigns'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateCampaign = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.updateCampaign>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.updateCampaign>[0]
>({
  mutationFn: (options) => orpcClient.crm.updateCampaign(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Campaign: ${data.name} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.campaigns'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteCampaign = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.deleteCampaign>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.deleteCampaign>[0]
>({
  mutationFn: (options) => orpcClient.crm.deleteCampaign(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `A record has been deleted`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.campaigns'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
