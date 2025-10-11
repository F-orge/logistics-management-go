import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';
import { inProduct } from './products';

export const paginateInvoiceItem = (
  options: Parameters<typeof orpcClient.crm.paginateInvoiceItem>[0],
) =>
  queryOptions({
    queryKey: ['crm.invoiceItems', options],
    queryFn: async ({ client }) => {
      const invoiceItems = await orpcClient.crm.paginateInvoiceItem(options);

      const products = await client.ensureQueryData(
        inProduct(invoiceItems.map((row) => row.productId)),
      );

      return invoiceItems.map((row) => ({
        ...row,
        product: products.find((subRow) => subRow.id === row.productId)!,
      }));
    },
    enabled: !!options,
  });

export const rangeInvoiceItem = (
  options: Parameters<typeof orpcClient.crm.rangeInvoiceItem>[0],
) =>
  queryOptions({
    queryKey: ['crm.invoiceItems', options],
    queryFn: () => orpcClient.crm.rangeInvoiceItem(options),
    enabled: !!options,
  });

export const inInvoiceItem = (
  options: Parameters<typeof orpcClient.crm.inInvoiceItem>[0],
) =>
  queryOptions({
    queryKey: ['crm.invoiceItems', options],
    queryFn: () => orpcClient.crm.inInvoiceItem(options),
    enabled: !!options,
  });

export const createInvoiceItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.createInvoiceItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.createInvoiceItem>[0]
>({
  mutationFn: (options) => orpcClient.crm.createInvoiceItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Invoice Item: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.invoiceItems'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateInvoiceItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.updateInvoiceItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.updateInvoiceItem>[0]
>({
  mutationFn: (options) => orpcClient.crm.updateInvoiceItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Invoice Item: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.invoiceItems'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteInvoiceItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.deleteInvoiceItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.deleteInvoiceItem>[0]
>({
  mutationFn: (options) => orpcClient.crm.deleteInvoiceItem(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `A record has been deleted`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.invoiceItems'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
