import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inWarehouse } from './warehouse';

export const paginateInboundShipment = (
  options: Parameters<typeof orpcClient.wms.paginateInboundShipment>[0],
) =>
  queryOptions({
    queryKey: ['wms.inboundShipment', 'paginate', options],
    queryFn: async ({ client }) => {
      const inboundShipments =
        await orpcClient.wms.paginateInboundShipment(options);

      const warehouses = await client.ensureQueryData(
        inWarehouse(
          inboundShipments.map((row) => row.warehouseId).filter(nonEmpty),
        ),
      );

      return inboundShipments.map((row) => ({
        ...row,
        warehouse: warehouses.find((subRow) => subRow.id === row.warehouseId),
      }));
    },
    enabled: !!options,
  });

export const rangeInboundShipment = (
  options: Parameters<typeof orpcClient.wms.rangeInboundShipment>[0],
) =>
  queryOptions({
    queryKey: ['wms.inboundShipment', 'range', options],
    queryFn: () => orpcClient.wms.rangeInboundShipment(options),
    enabled: !!options,
  });

export const inInboundShipment = (
  options: Parameters<typeof orpcClient.wms.inInboundShipment>[0],
) =>
  queryOptions({
    queryKey: ['wms.inboundShipment', 'in', options],
    queryFn: () => orpcClient.wms.inInboundShipment(options),
    enabled: !!options,
  });

export const createInboundShipment = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createInboundShipment>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createInboundShipment>[0]
>({
  mutationFn: (options) => orpcClient.wms.createInboundShipment(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Inbound Shipment: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['wms.inboundShipment'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateInboundShipment = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateInboundShipment>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateInboundShipment>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateInboundShipment(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Inbound Shipment: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['wms.inboundShipment'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteInboundShipment = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteInboundShipment>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteInboundShipment>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteInboundShipment(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Inbound Shipment has been deleted successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['wms.inboundShipment'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
