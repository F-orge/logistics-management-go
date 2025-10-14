import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['dms']['paginateCustomerTrackingLink'][number]
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'deliveryTaskId',
    header: 'Delivery Task ID',
    cell: ({ row }) => (
      <Button size={'sm'} variant={'outline'} className="w-full" asChild>
        <Link
          to="/dashboard/dms/delivery-task"
          search={{
            view: true,
            id: row.original.deliveryTaskId,
            filters: [
              {
                column: 'id',
                operation: '=',
                value: row.original.deliveryTaskId,
              },
            ],
          }}
        >
          <StringCell value={row.original.deliveryTaskId} />
        </Link>
      </Button>
    ),
  },
  {
    accessorKey: 'trackingToken',
    header: 'Tracking Token',
    cell: ({ row }) => <StringCell value={row.original.trackingToken} />,
  },
  {
    accessorKey: 'expiresAt',
    header: 'Expires At',
    cell: ({ row }) => <DateCell value={row.original.expiresAt} showTime />,
  },
  {
    accessorKey: 'accessCount',
    header: 'Access Count',
    cell: ({ row }) => <NumberCell value={row.original.accessCount} />,
  },
  {
    accessorKey: 'isActive',
    header: 'Is Active',
    cell: ({ row }) => (
      <StringCell value={row.original.isActive ? 'Yes' : 'No'} />
    ),
  },
  {
    accessorKey: 'lastAccessedAt',
    header: 'Last Accessed At',
    cell: ({ row }) => (
      <DateCell value={row.original.lastAccessedAt} showTime />
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
