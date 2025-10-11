import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inUser } from '@/queries/auth/user';
import { inInvoiceLineItem } from './invoice_line_item';

export const paginateDispute = (
  options: Parameters<typeof orpcClient.billing.paginateDispute>[0],
) =>
  queryOptions({
    queryKey: ['billing.dispute', 'paginate', options],
    queryFn: async ({ client }) => {
      const disputes = await orpcClient.billing.paginateDispute(options);

      const lineItems = await client.ensureQueryData(
        inInvoiceLineItem(
          disputes.map((row) => row.lineItemId).filter(nonEmpty),
        ),
      );
      const resolvedByUsers = await client.ensureQueryData(
        inUser(disputes.map((row) => row.resolvedByUserId).filter(nonEmpty)),
      );

      return disputes.map((row) => ({
        ...row,
        lineItem: lineItems.find((subRow) => subRow.id === row.lineItemId),
        resolvedByUser: resolvedByUsers.find(
          (subRow) => subRow.id === row.resolvedByUserId,
        ),
      }));
    },
    enabled: !!options,
  });

export const rangeDispute = (
  options: Parameters<typeof orpcClient.billing.rangeDispute>[0],
) =>
  queryOptions({
    queryKey: ['billing.dispute', 'range', options],
    queryFn: () => orpcClient.billing.rangeDispute(options),
    enabled: !!options,
  });

export const inDispute = (
  options: Parameters<typeof orpcClient.billing.inDispute>[0],
) =>
  queryOptions({
    queryKey: ['billing.dispute', 'in', options],
    queryFn: () => orpcClient.billing.inDispute(options),
    enabled: !!options,
  });

export const createDispute = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.createDispute>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.createDispute>[0]
>({
  mutationFn: (options) => orpcClient.billing.createDispute(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Dispute: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.dispute'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateDispute = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.updateDispute>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.updateDispute>[0]
>({
  mutationFn: (options) => orpcClient.billing.updateDispute(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Dispute: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.dispute'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteDispute = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.billing.deleteDispute>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.billing.deleteDispute>[0]
>({
  mutationFn: (options) => orpcClient.billing.deleteDispute(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Dispute has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['billing.dispute'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
