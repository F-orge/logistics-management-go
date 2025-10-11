import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

import { nonEmpty } from '@/lib/utils';
import { inDeliveryTask } from './delivery_task';

export const paginateCustomerTrackingLink = (
  options: Parameters<typeof orpcClient.dms.paginateCustomerTrackingLink>[0],
) =>
  queryOptions({
    queryKey: ['dms.customerTrackingLink', 'paginate', options],
    queryFn: async ({ client }) => {
      const customerTrackingLinks =
        await orpcClient.dms.paginateCustomerTrackingLink(options);

      const deliveryTasks = await client.ensureQueryData(
        inDeliveryTask(
          customerTrackingLinks
            .map((row) => row.deliveryTaskId)
            .filter(nonEmpty),
        ),
      );

      return customerTrackingLinks.map((row) => ({
        ...row,
        deliveryTask: deliveryTasks.find(
          (subRow) => subRow.id === row.deliveryTaskId,
        ),
      }));
    },
    enabled: !!options,
  });

export const rangeCustomerTrackingLink = (
  options: Parameters<typeof orpcClient.dms.rangeCustomerTrackingLink>[0],
) =>
  queryOptions({
    queryKey: ['dms.customerTrackingLink', 'range', options],
    queryFn: () => orpcClient.dms.rangeCustomerTrackingLink(options),
    enabled: !!options,
  });

export const inCustomerTrackingLink = (
  options: Parameters<typeof orpcClient.dms.inCustomerTrackingLink>[0],
) =>
  queryOptions({
    queryKey: ['dms.customerTrackingLink', 'in', options],
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
    await context.client.invalidateQueries({
      queryKey: ['dms.customerTrackingLink'],
    });
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
    await context.client.invalidateQueries({
      queryKey: ['dms.customerTrackingLink'],
    });
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
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Customer Tracking Link has been deleted successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['dms.customerTrackingLink'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
