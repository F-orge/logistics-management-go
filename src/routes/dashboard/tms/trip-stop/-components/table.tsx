import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import NumberCell from '@/components/table/cells/number';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginateTripStop'][number] & {
    trip?: ORPCOutputs['tms']['inTrip'][number];
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'trip',
    header: 'Trip',
    cell: ({ row }) =>
      row.original.trip ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/trip"
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
    accessorKey: 'stopNumber',
    header: 'Stop Number',
    cell: ({ row }) => <NumberCell value={row.original.stopNumber} />,
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => <StringCell value={row.original.location} />,
  },
  {
    accessorKey: 'scheduledArrivalTime',
    header: 'Scheduled Arrival Time',
    cell: ({ row }) => <DateCell value={row.original.scheduledArrivalTime} showTime />,
  },
  {
    accessorKey: 'actualArrivalTime',
    header: 'Actual Arrival Time',
    cell: ({ row }) => <DateCell value={row.original.actualArrivalTime} showTime />,
  },
  {
    accessorKey: 'scheduledDepartureTime',
    header: 'Scheduled Departure Time',
    cell: ({ row }) => <DateCell value={row.original.scheduledDepartureTime} showTime />,
  },
  {
    accessorKey: 'actualDepartureTime',
    header: 'Actual Departure Time',
    cell: ({ row }) => <DateCell value={row.original.actualDepartureTime} showTime />,
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
