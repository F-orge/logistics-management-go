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
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'shipmentLeg',
    header: 'Shipment Leg',
    cell: ({ row }) =>
      row.original.shipmentLeg ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/shipment-leg"
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
  {
    accessorKey: 'eventType',
    header: 'Event Type',
    cell: ({ row }) => <StringCell value={row.original.eventType} />,
  },
  {
    accessorKey: 'eventDetails',
    header: 'Event Details',
    cell: ({ row }) => <StringCell value={row.original.eventDetails} />,
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
];
