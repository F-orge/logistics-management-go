import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

export const paginateSupplier = (
  options: Parameters<typeof orpcClient.wms.paginateSupplier>[0],
) =>
  queryOptions({
    queryKey: ['wms.supplier', 'paginate', options],
    queryFn: () => orpcClient.wms.paginateSupplier(options),
    enabled: !!options,
  });

export const rangeSupplier = (
  options: Parameters<typeof orpcClient.wms.rangeSupplier>[0],
) =>
  queryOptions({
    queryKey: ['wms.supplier', 'range', options],
    queryFn: () => orpcClient.wms.rangeSupplier(options),
    enabled: !!options,
  });

export const inSupplier = (
  options: Parameters<typeof orpcClient.wms.inSupplier>[0],
) =>
  queryOptions({
    queryKey: ['wms.supplier', 'in', options],
    queryFn: () => orpcClient.wms.inSupplier(options),
    enabled: !!options,
  });

export const createSupplier = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createSupplier>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createSupplier>[0]
>({
  mutationFn: (options) => orpcClient.wms.createSupplier(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Supplier: ${data.name} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.supplier'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateSupplier = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateSupplier>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateSupplier>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateSupplier(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Supplier: ${data.name} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.supplier'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteSupplier = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteSupplier>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteSupplier>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteSupplier(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Supplier has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['wms.supplier'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
