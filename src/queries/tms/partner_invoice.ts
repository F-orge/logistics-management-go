import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

import { nonEmpty } from '@/lib/utils';
import { inCarrier } from './carrier';

export const paginatePartnerInvoice = (
  options: Parameters<typeof orpcClient.tms.paginatePartnerInvoice>[0],
) =>
  queryOptions({
    queryKey: ['tms.partnerInvoice', 'paginate', options],
    queryFn: async ({ client }) => {
      const partnerInvoices = await orpcClient.tms.paginatePartnerInvoice(options);

      const carriers = await client.ensureQueryData(
        inCarrier(partnerInvoices.map((row) => row.carrierId).filter(nonEmpty)),
      );

      return partnerInvoices.map((row) => ({
        ...row,
        carrier: carriers.find((subRow) => subRow.id === row.carrierId),
      }));
    },
    enabled: !!options,
  });

export const rangePartnerInvoice = (
  options: Parameters<typeof orpcClient.tms.rangePartnerInvoice>[0],
) =>
  queryOptions({
    queryKey: ['tms.partnerInvoice', 'range', options],
    queryFn: () => orpcClient.tms.rangePartnerInvoice(options),
    enabled: !!options,
  });

export const inPartnerInvoice = (
  options: Parameters<typeof orpcClient.tms.inPartnerInvoice>[0],
) =>
  queryOptions({
    queryKey: ['tms.partnerInvoice', 'in', options],
    queryFn: () => orpcClient.tms.inPartnerInvoice(options),
    enabled: !!options,
  });

export const createPartnerInvoice = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.createPartnerInvoice>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.createPartnerInvoice>[0]
>({
  mutationFn: (options) => orpcClient.tms.createPartnerInvoice(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Partner Invoice: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.partnerInvoice'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updatePartnerInvoice = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.updatePartnerInvoice>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.updatePartnerInvoice>[0]
>({
  mutationFn: (options) => orpcClient.tms.updatePartnerInvoice(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Partner Invoice: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.partnerInvoice'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deletePartnerInvoice = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.deletePartnerInvoice>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.deletePartnerInvoice>[0]
>({
  mutationFn: (options) => orpcClient.tms.deletePartnerInvoice(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Partner Invoice has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.partnerInvoice'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
