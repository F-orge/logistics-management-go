import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

import { nonEmpty } from '@/lib/utils';
import { inShipmentLeg } from './shipment_leg';

export const paginateShipmentLegEvent = (
  options: Parameters<typeof orpcClient.tms.paginateShipmentLegEvent>[0],
) =>
  queryOptions({
    queryKey: ['tms.shipmentLegEvent', 'paginate', options],
    queryFn: async ({ client }) => {
      const shipmentLegEvents = await orpcClient.tms.paginateShipmentLegEvent(options);

      const shipmentLegs = await client.ensureQueryData(
        inShipmentLeg(shipmentLegEvents.map((row) => row.shipmentLegId).filter(nonEmpty)),
      );

      return shipmentLegEvents.map((row) => ({
        ...row,
        shipmentLeg: shipmentLegs.find((subRow) => subRow.id === row.shipmentLegId),
      }));
    },
    enabled: !!options,
  });

export const rangeShipmentLegEvent = (
  options: Parameters<typeof orpcClient.tms.rangeShipmentLegEvent>[0],
) =>
  queryOptions({
    queryKey: ['tms.shipmentLegEvent', 'range', options],
    queryFn: () => orpcClient.tms.rangeShipmentLegEvent(options),
    enabled: !!options,
  });

export const inShipmentLegEvent = (
  options: Parameters<typeof orpcClient.tms.inShipmentLegEvent>[0],
) =>
  queryOptions({
    queryKey: ['tms.shipmentLegEvent', 'in', options],
    queryFn: () => orpcClient.tms.inShipmentLegEvent(options),
    enabled: !!options,
  });

export const createShipmentLegEvent = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.createShipmentLegEvent>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.createShipmentLegEvent>[0]
>({
  mutationFn: (options) => orpcClient.tms.createShipmentLegEvent(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Shipment Leg Event: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.shipmentLegEvent'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateShipmentLegEvent = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.updateShipmentLegEvent>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.updateShipmentLegEvent>[0]
>({
  mutationFn: (options) => orpcClient.tms.updateShipmentLegEvent(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Shipment Leg Event: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.shipmentLegEvent'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteShipmentLegEvent = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.deleteShipmentLegEvent>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.deleteShipmentLegEvent>[0]
>({
  mutationFn: (options) => orpcClient.tms.deleteShipmentLegEvent(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Shipment Leg Event has been deleted successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['tms.shipmentLegEvent'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
