import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['dms']['paginateTaskEvent'][number] & {
    deliveryTask?: ORPCOutputs['dms']['inDeliveryTask'][number];
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'deliveryTask',
    header: 'Delivery Task',
    cell: ({ row }) =>
      row.original.deliveryTask ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/dms/delivery-task"
            search={{
              view: true,
              id: row.original.deliveryTask.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.deliveryTask.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.deliveryTask.id} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'eventType',
    header: 'Event Type',
    cell: ({ row }) => <StringCell value={row.original.eventType} />,
  },
  {
    accessorKey: 'eventDetails',
    header: 'Event Details',
    cell: ({ row }) => <StringCell value={row.original.eventDetails} />,
  },
  {
    accessorKey: 'timestamp',
    header: 'Timestamp',
    cell: ({ row }) => <DateCell value={row.original.timestamp} showTime />,
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
