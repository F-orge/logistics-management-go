import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

export const paginateDeliveryRoute = (
  options: Parameters<typeof orpcClient.dms.paginateDeliveryRoute>[0],
) =>
  queryOptions({
    queryKey: ['dms.deliveryRoutes', options],
    queryFn: () => orpcClient.dms.paginateDeliveryRoute(options),
    enabled: !!options,
  });

export const rangeDeliveryRoute = (
  options: Parameters<typeof orpcClient.dms.rangeDeliveryRoute>[0],
) =>
  queryOptions({
    queryKey: ['dms.deliveryRoutes', options],
    queryFn: () => orpcClient.dms.rangeDeliveryRoute(options),
    enabled: !!options,
  });

export const inDeliveryRoute = (
  options: Parameters<typeof orpcClient.dms.inDeliveryRoute>[0],
) =>
  queryOptions({
    queryKey: ['dms.deliveryRoutes', options],
    queryFn: () =>
      options.length >= 1 ? orpcClient.dms.inDeliveryRoute(options) : [],
    enabled: !!options,
  });

export const createDeliveryRoute = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.dms.createDeliveryRoute>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.dms.createDeliveryRoute>[0]
>({
  mutationFn: (options) => orpcClient.dms.createDeliveryRoute(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Delivery Route: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['dms.deliveryRoutes'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateDeliveryRoute = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.dms.updateDeliveryRoute>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.dms.updateDeliveryRoute>[0]
>({
  mutationFn: (options) => orpcClient.dms.updateDeliveryRoute(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Delivery Route: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['dms.deliveryRoutes'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteDeliveryRoute = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.dms.deleteDeliveryRoute>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.dms.deleteDeliveryRoute>[0]
>({
  mutationFn: (options) => orpcClient.dms.deleteDeliveryRoute(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `A record has been deleted`,
    });
    await context.client.invalidateQueries({ queryKey: ['dms.deliveryRoutes'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
