import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';
import { inProduct } from './products';

export const paginateOpportunityProduct = (
  options: Parameters<typeof orpcClient.crm.paginateOpportunityProduct>[0],
) =>
  queryOptions({
    queryKey: ['crm.opportunityProducts', options],
    queryFn: async ({ client }) => {
      const opportunityProducts =
        await orpcClient.crm.paginateOpportunityProduct(options);

      const products = await client.ensureQueryData(
        inProduct(opportunityProducts.map((row) => row.productId)),
      );

      return opportunityProducts.map((row) => ({
        ...row,
        product: products.find((subRow) => subRow.id === row.productId)!,
      }));
    },
    enabled: !!options,
  });

export const rangeOpportunityProduct = (
  options: Parameters<typeof orpcClient.crm.rangeOpportunityProduct>[0],
) =>
  queryOptions({
    queryKey: ['crm.opportunityProducts', options],
    queryFn: () => orpcClient.crm.rangeOpportunityProduct(options),
    enabled: !!options,
  });

export const inOpportunityProduct = (
  options: Parameters<typeof orpcClient.crm.inOpportunityProduct>[0],
) =>
  queryOptions({
    queryKey: ['crm.opportunityProducts', options],
    queryFn: () =>
      options.length >= 1 ? orpcClient.crm.inOpportunityProduct(options) : [],
    enabled: !!options,
  });

export const createOpportunityProduct = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.createOpportunityProduct>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.createOpportunityProduct>[0]
>({
  mutationFn: (options) => orpcClient.crm.createOpportunityProduct(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Opportunity Product: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['crm.opportunityProducts'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateOpportunityProduct = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.updateOpportunityProduct>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.updateOpportunityProduct>[0]
>({
  mutationFn: (options) => orpcClient.crm.updateOpportunityProduct(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Opportunity Product: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['crm.opportunityProducts'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteOpportunityProduct = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.deleteOpportunityProduct>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.deleteOpportunityProduct>[0]
>({
  mutationFn: (options) => orpcClient.crm.deleteOpportunityProduct(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `A record has been deleted`,
    });
    await context.client.invalidateQueries({
      queryKey: ['crm.opportunityProducts'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
