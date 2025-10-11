import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import NumberCell from '@/components/table/cells/number';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

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
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'task',
    header: 'Task',
    cell: ({ row }) =>
      row.original.task ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/task"
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
    accessorKey: 'product',
    header: 'Product',
    cell: ({ row }) =>
      row.original.product ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/product"
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
    accessorKey: 'batch',
    header: 'Batch',
    cell: ({ row }) =>
      row.original.batch ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/inventory-batch"
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
    accessorKey: 'destinationLocation',
    header: 'Destination Location',
    cell: ({ row }) =>
      row.original.destinationLocation ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/location"
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
    accessorKey: 'sourceLocation',
    header: 'Source Location',
    cell: ({ row }) =>
      row.original.sourceLocation ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/location"
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
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => <NumberCell value={row.original.quantity} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
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
