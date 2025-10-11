import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';
import { inOpportunity } from './opportunities';
import { nonEmpty } from '@/lib/utils';

export const paginateInvoice = (
  options: Parameters<typeof orpcClient.crm.paginateInvoice>[0],
) =>
  queryOptions({
    queryKey: ['crm.invoices', options],
    queryFn: async ({ client }) => {
      const invoices = await orpcClient.crm.paginateInvoice(options);

      const opportunities = await client.ensureQueryData(
        inOpportunity(
          invoices.map((row) => row.opportunityId).filter(nonEmpty),
        ),
      );

      return invoices.map((row) => ({
        ...row,
        opportunity: opportunities.find(
          (subRow) => subRow.id === row.opportunityId,
        ),
      }));
    },
    enabled: !!options,
  });

export const rangeInvoice = (
  options: Parameters<typeof orpcClient.crm.rangeInvoice>[0],
) =>
  queryOptions({
    queryKey: ['crm.invoices', options],
    queryFn: () => orpcClient.crm.rangeInvoice(options),
    enabled: !!options,
  });

export const inInvoice = (
  options: Parameters<typeof orpcClient.crm.inInvoice>[0],
) =>
  queryOptions({
    queryKey: ['crm.invoices', options],
    queryFn: () => orpcClient.crm.inInvoice(options),
    enabled: !!options,
  });

export const createInvoice = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.createInvoice>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.createInvoice>[0]
>({
  mutationFn: (options) => orpcClient.crm.createInvoice(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Invoice: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.invoices'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateInvoice = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.updateInvoice>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.updateInvoice>[0]
>({
  mutationFn: (options) => orpcClient.crm.updateInvoice(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Invoice: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.invoices'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteInvoice = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.deleteInvoice>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.deleteInvoice>[0]
>({
  mutationFn: (options) => orpcClient.crm.deleteInvoice(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `A record has been deleted`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.invoices'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
