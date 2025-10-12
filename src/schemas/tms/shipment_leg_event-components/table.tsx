import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginateShipmentLegEvent'][number] & {
    shipmentLeg?: ORPCOutputs['tms']['inShipmentLeg'][number];
  }
>[] = [
  {
    accessorKey: 'eventTimestamp',
    header: 'Event Timestamp',
    cell: ({ row }) => <DateCell value={row.original.eventTimestamp} showTime />,
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => <StringCell value={row.original.location} />,
  },
  {
    accessorKey: 'statusMessage',
    header: 'Status Message',
    cell: ({ row }) => <StringCell value={row.original.statusMessage} />,
  },
  {
    id: 'shipmentLeg',
    header: 'Shipment Leg',
    cell: ({ row }) =>
      row.original.shipmentLeg ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/shipment-legs"
            search={{
              view: true,
              id: row.original.shipmentLeg.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.shipmentLeg.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.shipmentLeg.id} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
];
