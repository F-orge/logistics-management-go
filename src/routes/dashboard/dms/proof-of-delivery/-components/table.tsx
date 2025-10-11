import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['dms']['paginateProofOfDelivery'][number] & {
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
    accessorKey: 'deliveryStatus',
    header: 'Delivery Status',
    cell: ({ row }) => <StringCell value={row.original.deliveryStatus} />,
  },
  {
    accessorKey: 'recipientName',
    header: 'Recipient Name',
    cell: ({ row }) => <StringCell value={row.original.recipientName} />,
  },
  {
    accessorKey: 'signature',
    header: 'Signature',
    cell: ({ row }) => <StringCell value={row.original.signature} />,
  },
  {
    accessorKey: 'deliveryImage',
    header: 'Delivery Image',
    cell: ({ row }) => <StringCell value={row.original.deliveryImage} />,
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => <StringCell value={row.original.notes} />,
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
