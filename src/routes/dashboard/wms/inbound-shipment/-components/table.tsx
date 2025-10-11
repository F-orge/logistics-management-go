import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateInboundShipment'][number] & {
    warehouse?: ORPCOutputs['wms']['inWarehouse'][number];
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
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
    accessorKey: 'expectedArrivalDate',
    header: 'Expected Arrival Date',
    cell: ({ row }) => <DateCell value={row.original.expectedArrivalDate} showTime />,
  },
  {
    accessorKey: 'actualArrivalDate',
    header: 'Actual Arrival Date',
    cell: ({ row }) => <DateCell value={row.original.actualArrivalDate} showTime />,
  },
  {
    accessorKey: 'supplierName',
    header: 'Supplier Name',
    cell: ({ row }) => <StringCell value={row.original.supplierName} />,
  },
  {
    accessorKey: 'trackingNumber',
    header: 'Tracking Number',
    cell: ({ row }) => <StringCell value={row.original.trackingNumber} />,
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
