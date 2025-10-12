import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { BillingQuoteStatusEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginateQuote'][number] & {
    client?: ORPCOutputs['crm']['inCompany'][number]; // Assuming client is a company from CRM
    createdBy?: ORPCOutputs['auth']['inUser'][number];
  }
>[] = [
  {
    accessorKey: 'quoteNumber',
    header: 'Quote Number',
    cell: ({ row }) => <StringCell value={row.original.quoteNumber} />,
  },
  {
    accessorKey: 'quotedPrice',
    header: 'Quoted Price',
    cell: ({ row }) => <NumberCell value={row.original.quotedPrice} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'originDetails',
    header: 'Origin Details',
    cell: ({ row }) => <StringCell value={row.original.originDetails} />,
  },
  {
    accessorKey: 'destinationDetails',
    header: 'Destination Details',
    cell: ({ row }) => <StringCell value={row.original.destinationDetails} />,
  },
  {
    accessorKey: 'serviceLevel',
    header: 'Service Level',
    cell: ({ row }) => <StringCell value={row.original.serviceLevel} />,
  },
  {
    accessorKey: 'expiresAt',
    header: 'Expires At',
    cell: ({ row }) => <DateCell value={row.original.expiresAt} showTime />,
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => <StringCell value={row.original.notes} />,
  },
  {
    accessorKey: 'height',
    header: 'Height',
    cell: ({ row }) => <NumberCell value={row.original.height} />,
  },
  {
    accessorKey: 'length',
    header: 'Length',
    cell: ({ row }) => <NumberCell value={row.original.length} />,
  },
  {
    accessorKey: 'width',
    header: 'Width',
    cell: ({ row }) => <NumberCell value={row.original.width} />,
  },
  {
    accessorKey: 'volume',
    header: 'Volume',
    cell: ({ row }) => <NumberCell value={row.original.volume} />,
  },
  {
    accessorKey: 'weight',
    header: 'Weight',
    cell: ({ row }) => <NumberCell value={row.original.weight} />,
  },
  {
    id: 'client',
    header: 'Client',
    cell: ({ row }) =>
      row.original.client ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/crm/companies"
            search={{
              view: true,
              id: row.original.client.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.client.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.client.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    id: 'createdBy',
    header: 'Created By',
    cell: ({ row }) =>
      row.original.createdBy ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/auth/users"
            search={{
              view: true,
              id: row.original.createdBy.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.createdBy.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.createdBy.name} />
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
