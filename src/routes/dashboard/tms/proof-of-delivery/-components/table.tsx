import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import DateCell from '@/components/table/cells/date'
import StringCell from '@/components/table/cells/string'
import { Button } from '@/components/ui/button'
import type { ORPCOutputs } from '@/orpc/client'

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginateProofOfDelivery'][number] & {
    tripStop?: ORPCOutputs['tms']['inTripStop'][number]
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'tripStop',
    header: 'Trip Stop',
    cell: ({ row }) =>
      row.original.tripStop ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/trip-stop"
            search={{
              view: true,
              id: row.original.tripStop.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.tripStop.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.tripStop.id} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <StringCell value={row.original.type} />,
  },
  {
    accessorKey: 'filePath',
    header: 'File Path',
    cell: ({ row }) => <StringCell value={row.original.filePath} />,
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
]
