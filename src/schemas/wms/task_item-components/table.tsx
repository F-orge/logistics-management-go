import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import DateCell from '@/components/table/cells/date';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { WmsTaskItemStatusEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateTaskItem'][number] & {
    task?: ORPCOutputs['wms']['inTask'][number];
    product?: ORPCOutputs['wms']['inProduct'][number];
    batch?: ORPCOutputs['wms']['inInventoryBatch'][number];
    destinationLocation?: ORPCOutputs['wms']['inLocation'][number];
    sourceLocation?: ORPCOutputs['wms']['inLocation'][number];
  }
>[] = [
  {
    accessorKey: 'quantityRequired',
    header: 'Quantity Required',
    cell: ({ row }) => <NumberCell value={row.original.quantityRequired} />,
  },
  {
    accessorKey: 'quantityCompleted',
    header: 'Quantity Completed',
    cell: ({ row }) => <NumberCell value={row.original.quantityCompleted} />,
  },
  {
    accessorKey: 'quantityRemaining',
    header: 'Quantity Remaining',
    cell: ({ row }) => <NumberCell value={row.original.quantityRemaining} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'completedAt',
    header: 'Completed At',
    cell: ({ row }) => <DateCell value={row.original.completedAt} showTime />,
  },
  {
    accessorKey: 'expiryDate',
    header: 'Expiry Date',
    cell: ({ row }) => <DateCell value={row.original.expiryDate} showTime />,
  },
  {
    accessorKey: 'lotNumber',
    header: 'Lot Number',
    cell: ({ row }) => <StringCell value={row.original.lotNumber} />,
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => <StringCell value={row.original.notes} />,
  },
  {
    accessorKey: 'serialNumbers',
    header: 'Serial Numbers',
    cell: ({ row }) => <StringCell value={row.original.serialNumbers?.join(', ')} />,
  },
  {
    id: 'task',
    header: 'Task',
    cell: ({ row }) =>
      row.original.task ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/tasks"
            search={{
              view: true,
              id: row.original.task.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.task.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.task.id} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    id: 'product',
    header: 'Product',
    cell: ({ row }) =>
      row.original.product ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/products"
            search={{
              view: true,
              id: row.original.product.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.product.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.product.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    id: 'batch',
    header: 'Batch',
    cell: ({ row }) =>
      row.original.batch ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/inventory-batches"
            search={{
              view: true,
              id: row.original.batch.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.batch.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.batch.batchNumber} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    id: 'destinationLocation',
    header: 'Destination Location',
    cell: ({ row }) =>
      row.original.destinationLocation ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/locations"
            search={{
              view: true,
              id: row.original.destinationLocation.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.destinationLocation.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.destinationLocation.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    id: 'sourceLocation',
    header: 'Source Location',
    cell: ({ row }) =>
      row.original.sourceLocation ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/locations"
            search={{
              view: true,
              id: row.original.sourceLocation.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.sourceLocation.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.sourceLocation.name} />
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
