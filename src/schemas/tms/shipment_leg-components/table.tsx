import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { TmsShipmentLegStatusEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginateShipmentLeg'][number] & {
    carrier?: ORPCOutputs['tms']['inCarrier'][number];
    internalTrip?: ORPCOutputs['tms']['inTrip'][number];
    shipment?: ORPCOutputs['tms']['inShipment'][number];
  }
>[] = [
  {
    accessorKey: 'startLocation',
    header: 'Start Location',
    cell: ({ row }) => <StringCell value={row.original.startLocation} />,
  },
  {
    accessorKey: 'endLocation',
    header: 'End Location',
    cell: ({ row }) => <StringCell value={row.original.endLocation} />,
  },
  {
    accessorKey: 'legSequence',
    header: 'Leg Sequence',
    cell: ({ row }) => <NumberCell value={row.original.legSequence} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    id: 'carrier',
    header: 'Carrier',
    cell: ({ row }) =>
      row.original.carrier ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/carriers"
            search={{
              view: true,
              id: row.original.carrier.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.carrier.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.carrier.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    id: 'internalTrip',
    header: 'Internal Trip',
    cell: ({ row }) =>
      row.original.internalTrip ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/trips"
            search={{
              view: true,
              id: row.original.internalTrip.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.internalTrip.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.internalTrip.id} />
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
