import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import DateCell from '@/components/table/cells/date'
import StringCell from '@/components/table/cells/string'
import { Button } from '@/components/ui/button'
import type { ORPCOutputs } from '@/orpc/client'

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginateShipmentLeg'][number] & {
    carrier?: ORPCOutputs['tms']['inCarrier'][number]
    internalTrip?: ORPCOutputs['tms']['inTrip'][number]
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'carrier',
    header: 'Carrier',
    cell: ({ row }) =>
      row.original.carrier ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/carrier"
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
    accessorKey: 'internalTrip',
    header: 'Internal Trip',
    cell: ({ row }) =>
      row.original.internalTrip ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/tms/trip"
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
    accessorKey: 'shipmentId',
    header: 'Shipment ID',
    cell: ({ row }) => <StringCell value={row.original.shipmentId} />,
  },
  {
    accessorKey: 'startLocation',
    header: 'Start Location',
    cell: ({ row }) => <StringCell value={row.original.startLocation} />,
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
