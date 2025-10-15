import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import DateCell from '@/components/table/cells/date'
import StringCell from '@/components/table/cells/string'
import { Button } from '@/components/ui/button'
import type { ORPCOutputs } from '@/orpc/client'

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateTask'][number] & {
    warehouse?: ORPCOutputs['wms']['inWarehouse'][number]
    user?: ORPCOutputs['auth']['inUser'][number]
    pickBatch?: ORPCOutputs['wms']['inPickBatch'][number]
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
    accessorKey: 'user',
    header: 'Assigned User',
    cell: ({ row }) =>
      row.original.user ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/auth/users"
            search={{
              view: true,
              id: row.original.user.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.user.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.user.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'pickBatch',
    header: 'Pick Batch',
    cell: ({ row }) =>
      row.original.pickBatch ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/pick-batch"
            search={{
              view: true,
              id: row.original.pickBatch.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.pickBatch.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.pickBatch.batchNumber} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'taskType',
    header: 'Task Type',
    cell: ({ row }) => <StringCell value={row.original.taskType} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ row }) => <DateCell value={row.original.dueDate} showTime />,
  },
  {
    accessorKey: 'completedDate',
    header: 'Completed Date',
    cell: ({ row }) => <DateCell value={row.original.completedDate} showTime />,
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
]
