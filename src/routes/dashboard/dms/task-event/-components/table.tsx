import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['dms']['paginateTaskEvent'][number]
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
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'timestamp',
    header: 'Timestamp',
    cell: ({ row }) => <DateCell value={row.original.timestamp} showTime />,
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => <StringCell value={row.original.notes} />,
  },
  {
    accessorKey: 'latitude',
    header: 'Latitude',
    cell: ({ row }) => <NumberCell value={row.original.latitude} />,
  },
  {
    accessorKey: 'longitude',
    header: 'Longitude',
    cell: ({ row }) => <NumberCell value={row.original.longitude} />,
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ row }) => <StringCell value={row.original.reason} />,
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
