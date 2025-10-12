import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inInvoice } from './invoice';

export const paginateInvoiceLineItem = (
  options: Parameters<typeof orpcClient.billing.paginateInvoiceLineItem>[0],
) =>
  queryOptions({
    queryKey: ['billing.invoiceLineItem', 'paginate', options],
    queryFn: async ({ client }) => {
      const invoiceLineItems =
        await orpcClient.billing.paginateInvoiceLineItem(options);

      return invoiceLineItems.map((row) => ({
        ...row,
      }));
    },
    enabled: !!options,
  });

export const rangeInvoiceLineItem = (
  options: Parameters<typeof orpcClient.billing.rangeInvoiceLineItem>[0],
) =>
  queryOptions({
    queryKey: ['billing.invoiceLineItem', 'range', options],
    queryFn: () => orpcClient.billing.rangeInvoiceLineItem(options),
    enabled: !!options,
  });

export const inInvoiceLineItem = (
  options: Parameters<typeof orpcClient.billing.inInvoiceLineItem>[0],
) =>
  queryOptions({
    queryKey: ['billing.invoiceLineItem', 'in', options],
    queryFn: () => orpcClient.billing.inInvoiceLineItem(options),
    enabled: !!options,
  });

export const createInvoiceLineItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.createInvoiceLineItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.createInvoiceLineItem>[0]
>({
  mutationFn: (options) => orpcClient.billing.createInvoiceLineItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Invoice Line Item: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['billing.invoiceLineItem'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateInvoiceLineItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.updateInvoiceLineItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.updateInvoiceLineItem>[0]
>({
  mutationFn: (options) => orpcClient.billing.updateInvoiceLineItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Invoice Line Item: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['billing.invoiceLineItem'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteInvoiceLineItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.deleteInvoiceLineItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.deleteInvoiceLineItem>[0]
>({
  mutationFn: (options) => orpcClient.billing.deleteInvoiceLineItem(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Invoice Line Item has been deleted successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['billing.invoiceLineItem'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
