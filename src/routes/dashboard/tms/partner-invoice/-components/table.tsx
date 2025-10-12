import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginatePartnerInvoice'][number] & {
    carrier?: ORPCOutputs['tms']['inCarrier'][number];
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'invoiceNumber',
    header: 'Invoice Number',
    cell: ({ row }) => <StringCell value={row.original.invoiceNumber} />,
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
    cell: ({ row }) => <StringCell value={row.original.carrier.name} />,
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'invoiceDate',
    header: 'Invoice Date',
    cell: ({ row }) => <DateCell value={row.original.invoiceDate} showTime />,
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total Amount',
    cell: ({ row }) => <NumberCell value={row.original.totalAmount} />,
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
