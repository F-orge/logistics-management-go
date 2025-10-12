import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['dms']['paginateDeliveryTask'][number]
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'deliveryRouteId',
    header: 'Delivery Route ID',
    cell: ({ row }) => (
      <Button size={'sm'} variant={'outline'} className="w-full" asChild>
        <Link
          to="/dashboard/dms/delivery-route"
          search={{
            view: true,
            id: row.original.deliveryRouteId,
            filters: [
              {
                column: 'id',
                operation: '=',
                value: row.original.deliveryRouteId,
              },
            ],
          }}
        >
          <StringCell value={row.original.deliveryRouteId} />
        </Link>
      </Button>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'failureReason',
    header: 'Failure Reason',
    cell: ({ row }) => <StringCell value={row.original.failureReason} />,
  },
  {
    accessorKey: 'estimatedArrivalTime',
    header: 'Estimated Arrival Time',
    cell: ({ row }) => <DateCell value={row.original.estimatedArrivalTime} showTime />,
  },
  {
    accessorKey: 'deliveryTime',
    header: 'Delivery Time',
    cell: ({ row }) => <DateCell value={row.original.deliveryTime} showTime />,
  },
  {
    accessorKey: 'deliveryAddress',
    header: 'Delivery Address',
    cell: ({ row }) => <StringCell value={row.original.deliveryAddress} />,
  },
  {
    accessorKey: 'recipientName',
    header: 'Recipient Name',
    cell: ({ row }) => <StringCell value={row.original.recipientName} />,
  },
  {
    accessorKey: 'recipientPhone',
    header: 'Recipient Phone',
    cell: ({ row }) => <StringCell value={row.original.recipientPhone} />,
  },
  {
    accessorKey: 'deliveryInstructions',
    header: 'Delivery Instructions',
    cell: ({ row }) => <StringCell value={row.original.deliveryInstructions} />,
  },
  {
    accessorKey: 'actualArrivalTime',
    header: 'Actual Arrival Time',
    cell: ({ row }) => <DateCell value={row.original.actualArrivalTime} showTime />,
  },
  {
    accessorKey: 'attemptCount',
    header: 'Attempt Count',
    cell: ({ row }) => <NumberCell value={row.original.attemptCount} />,
  },
  {
    accessorKey: 'packageId',
    header: 'Package ID',
    cell: ({ row }) => (
      <Button size={'sm'} variant={'outline'} className="w-full" asChild>
        <Link
          to="/dashboard/dms/packages"
          search={{
            view: true,
            id: row.original.packageId,
            filters: [
              {
                column: 'id',
                operation: '=',
                value: row.original.packageId,
              },
            ],
          }}
        >
          <StringCell value={row.original.packageId} />
        </Link>
      </Button>
    ),
  },
  {
    accessorKey: 'routeSequence',
    header: 'Route Sequence',
    cell: ({ row }) => <NumberCell value={row.original.routeSequence} />,
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
