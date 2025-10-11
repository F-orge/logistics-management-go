import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inPartnerInvoice } from './partner_invoice';
import { inShipmentLeg } from './shipment_leg';

export const paginatePartnerInvoiceItem = (
  options: Parameters<typeof orpcClient.tms.paginatePartnerInvoiceItem>[0],
) =>
  queryOptions({
    queryKey: ['tms.partnerInvoiceItem', 'paginate', options],
    queryFn: async ({ client }) => {
      const partnerInvoiceItems =
        await orpcClient.tms.paginatePartnerInvoiceItem(options);

      const partnerInvoices = await client.ensureQueryData(
        inPartnerInvoice(
          partnerInvoiceItems
            .map((row) => row.partnerInvoiceId)
            .filter(nonEmpty),
        ),
      );
      const shipmentLegs = await client.ensureQueryData(
        inShipmentLeg(
          partnerInvoiceItems.map((row) => row.shipmentLegId).filter(nonEmpty),
        ),
      );

      return partnerInvoiceItems.map((row) => ({
        ...row,
        partnerInvoice: partnerInvoices.find(
          (subRow) => subRow.id === row.partnerInvoiceId,
        ),
        shipmentLeg: shipmentLegs.find(
          (subRow) => subRow.id === row.shipmentLegId,
        ),
      }));
    },
    enabled: !!options,
  });

export const rangePartnerInvoiceItem = (
  options: Parameters<typeof orpcClient.tms.rangePartnerInvoiceItem>[0],
) =>
  queryOptions({
    queryKey: ['tms.partnerInvoiceItem', 'range', options],
    queryFn: () => orpcClient.tms.rangePartnerInvoiceItem(options),
    enabled: !!options,
  });

export const inPartnerInvoiceItem = (
  options: Parameters<typeof orpcClient.tms.inPartnerInvoiceItem>[0],
) =>
  queryOptions({
    queryKey: ['tms.partnerInvoiceItem', 'in', options],
    queryFn: () => orpcClient.tms.inPartnerInvoiceItem(options),
    enabled: !!options,
  });

export const createPartnerInvoiceItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.createPartnerInvoiceItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.createPartnerInvoiceItem>[0]
>({
  mutationFn: (options) => orpcClient.tms.createPartnerInvoiceItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Partner Invoice Item: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['tms.partnerInvoiceItem'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updatePartnerInvoiceItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.updatePartnerInvoiceItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.updatePartnerInvoiceItem>[0]
>({
  mutationFn: (options) => orpcClient.tms.updatePartnerInvoiceItem(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Partner Invoice Item: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['tms.partnerInvoiceItem'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deletePartnerInvoiceItem = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.deletePartnerInvoiceItem>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.deletePartnerInvoiceItem>[0]
>({
  mutationFn: (options) => orpcClient.tms.deletePartnerInvoiceItem(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Partner Invoice Item has been deleted successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['tms.partnerInvoiceItem'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
