import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import DateCell from '@/components/table/cells/date'
import NumberCell from '@/components/table/cells/number'
import StringCell from '@/components/table/cells/string'
import { Button } from '@/components/ui/button'
import type { ORPCOutputs } from '@/orpc/client'

export const columns: ColumnDef<ORPCOutputs['dms']['paginateDeliveryRoute'][number]>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'routeDate',
    header: 'Route Date',
    cell: ({ row }) => <DateCell value={row.original.routeDate} />,
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
    accessorKey: 'driverId',
    header: 'Driver ID',
    cell: ({ row }) => (
      <Button size={'sm'} variant={'outline'} className="w-full" asChild>
        <Link
          to="/dashboard/tms/driver"
          search={{
            view: true,
            id: row.original.driverId,
            filters: [
              {
                column: 'id',
                operation: '=',
                value: row.original.driverId,
              },
            ],
          }}
        >
          <StringCell value={row.original.driverId} />
        </Link>
      </Button>
    ),
  },
  {
    accessorKey: 'actualDurationMinutes',
    header: 'Actual Duration (Minutes)',
    cell: ({ row }) => <NumberCell value={row.original.actualDurationMinutes} />,
  },
  {
    accessorKey: 'estimatedDurationMinutes',
    header: 'Estimated Duration (Minutes)',
    cell: ({ row }) => <NumberCell value={row.original.estimatedDurationMinutes} />,
  },
  {
    accessorKey: 'optimizedRouteData',
    header: 'Optimized Route Data',
    cell: ({ row }) => <StringCell value={row.original.optimizedRouteData} />,
  },
  {
    accessorKey: 'totalDistanceKm',
    header: 'Total Distance (KM)',
    cell: ({ row }) => <NumberCell value={row.original.totalDistanceKm} />,
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
