import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

export const paginateCustomerTrackingLink = (
  options: Parameters<typeof orpcClient.dms.paginateCustomerTrackingLink>[0],
) =>
  queryOptions({
    queryKey: ['dms.customerTrackingLinks', options],
    queryFn: () => orpcClient.dms.paginateCustomerTrackingLink(options),
    enabled: !!options,
  });

export const rangeCustomerTrackingLink = (
  options: Parameters<typeof orpcClient.dms.rangeCustomerTrackingLink>[0],
) =>
  queryOptions({
    queryKey: ['dms.customerTrackingLinks', options],
    queryFn: () => orpcClient.dms.rangeCustomerTrackingLink(options),
    enabled: !!options,
  });

export const inCustomerTrackingLink = (
  options: Parameters<typeof orpcClient.dms.inCustomerTrackingLink>[0],
) =>
  queryOptions({
    queryKey: ['dms.customerTrackingLinks', options],
    queryFn: () =>
      options.length >= 1 ? orpcClient.dms.inCustomerTrackingLink(options) : [],
    enabled: !!options,
  });

export const createCustomerTrackingLink = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.dms.createCustomerTrackingLink>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.dms.createCustomerTrackingLink>[0]
>({
  mutationFn: (options) => orpcClient.dms.createCustomerTrackingLink(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Customer Tracking Link: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['dms.customerTrackingLinks'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateCustomerTrackingLink = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.dms.updateCustomerTrackingLink>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.dms.updateCustomerTrackingLink>[0]
>({
  mutationFn: (options) => orpcClient.dms.updateCustomerTrackingLink(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Customer Tracking Link: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['dms.customerTrackingLinks'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteCustomerTrackingLink = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.dms.deleteCustomerTrackingLink>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.dms.deleteCustomerTrackingLink>[0]
>({
  mutationFn: (options) => orpcClient.dms.deleteCustomerTrackingLink(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `A record has been deleted`,
    });
    await context.client.invalidateQueries({ queryKey: ['dms.customerTrackingLinks'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
