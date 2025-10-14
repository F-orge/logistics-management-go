import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { paginateOutboundShipmentItem } from './outbound_shipment_item';
import { inSalesOrder } from './sales_order';
import { inWarehouse } from './warehouse';

export const paginateOutboundShipment = (
  options: Parameters<typeof orpcClient.wms.paginateOutboundShipment>[0],
) =>
  queryOptions({
    queryKey: ['wms.outboundShipment', 'paginate', options],
    queryFn: async ({ client }) => {
      const outboundShipments =
        await orpcClient.wms.paginateOutboundShipment(options);

      const salesOrders = await client.ensureQueryData(
        inSalesOrder(
          outboundShipments.map((row) => row.salesOrderId).filter(nonEmpty),
        ),
      );

      const warehouses = await client.ensureQueryData(
        inWarehouse(
          outboundShipments.map((row) => row.warehouseId).filter(nonEmpty),
        ),
      );

      const items = await client.ensureQueryData(
        paginateOutboundShipmentItem({
          page: 1,
          perPage: 100,
          filters: [
            {
              column: 'outboundShipmentId',
              operation: 'in',
              value: outboundShipments.map((row) => row.id),
            },
          ],
        }),
      );

      return outboundShipments.map((row) => ({
        ...row,
        salesOrder: salesOrders.find(
          (subRow) => subRow.id === row.salesOrderId,
        ),
        warehouse: warehouses.find((subRow) => subRow.id === row.warehouseId),
        items: items.filter((subRow) => subRow.outboundShipmentId === row.id),
      }));
    },
    enabled: !!options,
  });

export const rangeOutboundShipment = (
  options: Parameters<typeof orpcClient.wms.rangeOutboundShipment>[0],
) =>
  queryOptions({
    queryKey: ['wms.outboundShipment', 'range', options],
    queryFn: () => orpcClient.wms.rangeOutboundShipment(options),
    enabled: !!options,
  });

export const inOutboundShipment = (
  options: Parameters<typeof orpcClient.wms.inOutboundShipment>[0],
) =>
  queryOptions({
    queryKey: ['wms.outboundShipment', 'in', options],
    queryFn: () => orpcClient.wms.inOutboundShipment(options),
    enabled: !!options,
  });

export const createOutboundShipment = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.createOutboundShipment>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.createOutboundShipment>[0]
>({
  mutationFn: (options) => orpcClient.wms.createOutboundShipment(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Outbound Shipment: ${data.id} has been added successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['wms.outboundShipment'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateOutboundShipment = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.updateOutboundShipment>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.updateOutboundShipment>[0]
>({
  mutationFn: (options) => orpcClient.wms.updateOutboundShipment(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Outbound Shipment: ${data.id} has been updated successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['wms.outboundShipment'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteOutboundShipment = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.wms.deleteOutboundShipment>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.wms.deleteOutboundShipment>[0]
>({
  mutationFn: (options) => orpcClient.wms.deleteOutboundShipment(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Outbound Shipment has been deleted successfully`,
    });
    await context.client.invalidateQueries({
      queryKey: ['wms.outboundShipment'],
    });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
