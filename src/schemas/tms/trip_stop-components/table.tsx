import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { TmsTripStopStatusEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginateTripStop'][number] & {
    trip?: ORPCOutputs['tms']['inTrip'][number];
    shipment?: ORPCOutputs['tms']['inShipment'][number];
  }
>[] = [
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => <StringCell value={row.original.address} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'sequence',
    header: 'Sequence',
    cell: ({ row }) => <NumberCell value={row.original.sequence} />,
  },
  {
    accessorKey: 'actualArrivalTime',
    header: 'Actual Arrival Time',
    cell: ({ row }) => <DateCell value={row.original.actualArrivalTime} showTime />,
  },
  {
    accessorKey: 'actualDepartureTime',
    header: 'Actual Departure Time',
    cell: ({ row }) => <DateCell value={row.original.actualDepartureTime} showTime />,
  },
  {
    accessorKey: 'estimatedArrivalTime',
    header: 'Estimated Arrival Time',
    cell: ({ row }) => <DateCell value={row.original.estimatedArrivalTime} showTime />,
  },
  {
    accessorKey: 'estimatedDepartureTime',
    header: 'Estimated Departure Time',
    cell: ({ row }) => <DateCell value={row.original.estimatedDepartureTime} showTime />,
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
    id: 'shipment',
    header: 'Shipment',
    cell: ({ row }) =>
      row.original.shipment ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/shipments"
            search={{
              view: true,
              id: row.original.shipment.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.shipment.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.shipment.id} />
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
