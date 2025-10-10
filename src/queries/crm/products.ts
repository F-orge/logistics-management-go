import { orpcClient } from '@/orpc/client';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

export const paginateProduct = (
  options: Parameters<typeof orpcClient.crm.paginateProduct>[0],
) =>
  queryOptions({
    queryKey: ['crm.products', options],
    queryFn: () => orpcClient.crm.paginateProduct(options),
    enabled: !!options,
  });

export const rangeProduct = (
  options: Parameters<typeof orpcClient.crm.rangeProduct>[0],
) =>
  queryOptions({
    queryKey: ['crm.products', options],
    queryFn: () => orpcClient.crm.rangeProduct(options),
    enabled: !!options,
  });

export const inProduct = (
  options: Parameters<typeof orpcClient.crm.inProduct>[0],
) =>
  queryOptions({
    queryKey: ['crm.products', options],
    queryFn: () => orpcClient.crm.inProduct(options),
    enabled: !!options,
  });

export const createProduct = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.createProduct>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.createProduct>[0]
>({
  mutationFn: (options) => orpcClient.crm.createProduct(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Product: ${data.name} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.products'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateProduct = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.updateProduct>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.updateProduct>[0]
>({
  mutationFn: (options) => orpcClient.crm.updateProduct(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Product: ${data.name} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.products'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteProduct = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.deleteProduct>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.deleteProduct>[0]
>({
  mutationFn: (options) => orpcClient.crm.deleteProduct(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `A record has been deleted`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.products'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
