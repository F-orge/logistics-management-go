import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['dms']['paginateCustomerTrackingLink'][number] & {
    deliveryTask?: ORPCOutputs['dms']['inDeliveryTask'][number];
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'trackingUrl',
    header: 'Tracking URL',
    cell: ({ row }) => (
      <a
        href={row.original.trackingUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <StringCell value={row.original.trackingUrl} />
      </a>
    ),
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
