import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import DateCell from '@/components/table/cells/date';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { WmsTaskStatusEnum, WmsTaskTypeEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateTask'][number] & {
    warehouse?: ORPCOutputs['wms']['inWarehouse'][number];
    user?: ORPCOutputs['auth']['inUser'][number];
    pickBatch?: ORPCOutputs['wms']['inPickBatch'][number];
  }
>[] = [
  {
    accessorKey: 'taskNumber',
    header: 'Task Number',
    cell: ({ row }) => <StringCell value={row.original.taskNumber} />,
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <StringCell value={row.original.type} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => <NumberCell value={row.original.priority} />,
  },
  {
    accessorKey: 'instructions',
    header: 'Instructions',
    cell: ({ row }) => <StringCell value={row.original.instructions} />,
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => <StringCell value={row.original.notes} />,
  },
  {
    accessorKey: 'sourceEntityId',
    header: 'Source Entity ID',
    cell: ({ row }) => <StringCell value={row.original.sourceEntityId} />,
  },
  {
    accessorKey: 'sourceEntityType',
    header: 'Source Entity Type',
    cell: ({ row }) => <StringCell value={row.original.sourceEntityType} />,
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
    accessorKey: 'durationSeconds',
    header: 'Duration Seconds',
    cell: ({ row }) => <NumberCell value={row.original.durationSeconds} />,
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time',
    cell: ({ row }) => <DateCell value={row.original.startTime} showTime />,
  },
  {
    accessorKey: 'endTime',
    header: 'End Time',
    cell: ({ row }) => <DateCell value={row.original.endTime} showTime />,
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
    id: 'user',
    header: 'User',
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
    id: 'pickBatch',
    header: 'Pick Batch',
    cell: ({ row }) =>
      row.original.pickBatch ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/pick-batches"
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
