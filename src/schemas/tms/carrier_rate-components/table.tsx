import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { TmsCarrierRateUnitEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginateCarrierRate'][number] & {
    carrier?: ORPCOutputs['tms']['inCarrier'][number];
  }
>[] = [
  {
    accessorKey: 'origin',
    header: 'Origin',
    cell: ({ row }) => <StringCell value={row.original.origin} />,
  },
  {
    accessorKey: 'destination',
    header: 'Destination',
    cell: ({ row }) => <StringCell value={row.original.destination} />,
  },
  {
    accessorKey: 'unit',
    header: 'Unit',
    cell: ({ row }) => <StringCell value={row.original.unit} />,
  },
  {
    accessorKey: 'rate',
    header: 'Rate',
    cell: ({ row }) => <NumberCell value={row.original.rate} />,
  },
  {
    accessorKey: 'serviceType',
    header: 'Service Type',
    cell: ({ row }) => <StringCell value={row.original.serviceType} />,
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
