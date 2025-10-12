import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { WmsOutboundShipmentStatusEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateOutboundShipment'][number] & {
    salesOrder?: ORPCOutputs['wms']['inSalesOrder'][number];
    warehouse?: ORPCOutputs['wms']['inWarehouse'][number];
  }
>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'carrier',
    header: 'Carrier',
    cell: ({ row }) => <StringCell value={row.original.carrier} />,
  },
  {
    accessorKey: 'trackingNumber',
    header: 'Tracking Number',
    cell: ({ row }) => <StringCell value={row.original.trackingNumber} />,
  },
  {
    id: 'salesOrder',
    header: 'Sales Order',
    cell: ({ row }) =>
      row.original.salesOrder ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/sales-orders"
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
            <StringCell value={row.original.salesOrder.orderNumber} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    id: 'warehouse',
    header: 'Warehouse',
    cell: ({ row }) =>
      row.original.warehouse ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/warehouses"
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
