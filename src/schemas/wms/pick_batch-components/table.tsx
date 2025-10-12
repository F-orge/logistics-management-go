import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { WmsPickBatchStatusEnum, WmsPickStrategyEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginatePickBatch'][number] & {
    warehouse?: ORPCOutputs['wms']['inWarehouse'][number];
    assignedUser?: ORPCOutputs['auth']['inUser'][number];
  }
>[] = [
  {
    accessorKey: 'batchNumber',
    header: 'Batch Number',
    cell: ({ row }) => <StringCell value={row.original.batchNumber} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'strategy',
    header: 'Strategy',
    cell: ({ row }) => <StringCell value={row.original.strategy} />,
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => <NumberCell value={row.original.priority} />,
  },
  {
    accessorKey: 'totalItems',
    header: 'Total Items',
    cell: ({ row }) => <NumberCell value={row.original.totalItems} />,
  },
  {
    accessorKey: 'completedItems',
    header: 'Completed Items',
    cell: ({ row }) => <NumberCell value={row.original.completedItems} />,
  },
  {
    accessorKey: 'estimatedDuration',
    header: 'Estimated Duration',
    cell: ({ row }) => <NumberCell value={row.original.estimatedDuration} />,
  },
  {
    accessorKey: 'actualDuration',
    header: 'Actual Duration',
    cell: ({ row }) => <NumberCell value={row.original.actualDuration} />,
  },
  {
    accessorKey: 'startedAt',
    header: 'Started At',
    cell: ({ row }) => <DateCell value={row.original.startedAt} showTime />,
  },
  {
    accessorKey: 'completedAt',
    header: 'Completed At',
    cell: ({ row }) => <DateCell value={row.original.completedAt} showTime />,
  },
  {
    accessorKey: 'waveId',
    header: 'Wave ID',
    cell: ({ row }) => <StringCell value={row.original.waveId} />,
  },
  {
    accessorKey: 'zoneRestrictions',
    header: 'Zone Restrictions',
    cell: ({ row }) => <StringCell value={row.original.zoneRestrictions?.join(', ')} />,
  },
  {
    id: 'warehouse',
    header: 'Warehouse',
    cell: ({ row }) =>
      row.original.warehouse ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/warehouses"
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
    id: 'assignedUser',
    header: 'Assigned User',
    cell: ({ row }) =>
      row.original.assignedUser ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/auth/users"
            search={{
              view: true,
              id: row.original.assignedUser.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.assignedUser.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.assignedUser.name} />
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
