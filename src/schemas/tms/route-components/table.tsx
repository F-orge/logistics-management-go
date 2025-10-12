import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginateRoute'][number] & {
    trip?: ORPCOutputs['tms']['inTrip'][number];
  }
>[] = [
  {
    accessorKey: 'optimizedRouteData',
    header: 'Optimized Route Data',
    cell: ({ row }) => <StringCell value={row.original.optimizedRouteData} />,
  },
  {
    accessorKey: 'totalDistance',
    header: 'Total Distance',
    cell: ({ row }) => <NumberCell value={row.original.totalDistance} />,
  },
  {
    accessorKey: 'totalDuration',
    header: 'Total Duration',
    cell: ({ row }) => <NumberCell value={row.original.totalDuration} />,
  },
  {
    id: 'trip',
    header: 'Trip',
    cell: ({ row }) =>
      row.original.trip ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/trips"
            search={{
              view: true,
              id: row.original.trip.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.trip.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.trip.id} />
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
