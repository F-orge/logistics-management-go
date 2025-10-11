import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateOutboundShipment'][number] & {
    salesOrder?: ORPCOutputs['wms']['inSalesOrder'][number];
    warehouse?: ORPCOutputs['wms']['inWarehouse'][number];
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'salesOrder',
    header: 'Sales Order',
    cell: ({ row }) =>
      row.original.salesOrder ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/sales-order"
            search={{
              view: true,
              id: row.original.salesOrder.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.salesOrder.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.salesOrder.id} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'warehouse',
    header: 'Warehouse',
    cell: ({ row }) =>
      row.original.warehouse ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/warehouse"
            search={{
              view: true,
              id: row.original.warehouse.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.warehouse.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.warehouse.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'shipmentNumber',
    header: 'Shipment Number',
    cell: ({ row }) => <StringCell value={row.original.shipmentNumber} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'shippingCarrier',
    header: 'Shipping Carrier',
    cell: ({ row }) => <StringCell value={row.original.shippingCarrier} />,
  },
  {
    accessorKey: 'trackingNumber',
    header: 'Tracking Number',
    cell: ({ row }) => <StringCell value={row.original.trackingNumber} />,
  },
  {
    accessorKey: 'expectedShipDate',
    header: 'Expected Ship Date',
    cell: ({ row }) => <DateCell value={row.original.expectedShipDate} showTime />,
  },
  {
    accessorKey: 'actualShipDate',
    header: 'Actual Ship Date',
    cell: ({ row }) => <DateCell value={row.original.actualShipDate} showTime />,
  },
  {
    accessorKey: 'deliveryAddress',
    header: 'Delivery Address',
    cell: ({ row }) => <StringCell value={row.original.deliveryAddress} />,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => <DateCell value={row.original.createdAt} showTime />,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => <DateCell value={row.original.updatedAt} showTime />,
  },
];
