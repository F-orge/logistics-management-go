import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginateInvoice'][number] & {
    createdByUser?: ORPCOutputs['auth']['inUser'][number];
    quote?: ORPCOutputs['billing']['inQuote'][number];
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'createdByUser',
    header: 'Created By',
    cell: ({ row }) =>
      row.original.createdByUser ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/auth/users"
            search={{
              view: true,
              id: row.original.createdByUser.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.createdByUser.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.createdByUser.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'quote',
    header: 'Quote',
    cell: ({ row }) =>
      row.original.quote ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/billing/quote"
            search={{
              view: true,
              id: row.original.quote.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.quote.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.quote.quoteNumber} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'invoiceNumber',
    header: 'Invoice Number',
    cell: ({ row }) => <StringCell value={row.original.invoiceNumber} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'issueDate',
    header: 'Issue Date',
    cell: ({ row }) => <DateCell value={row.original.issueDate} showTime />,
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ row }) => <DateCell value={row.original.dueDate} showTime />,
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total Amount',
    cell: ({ row }) => <NumberCell value={row.original.totalAmount} />,
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
    cell: ({ row }) => <StringCell value={row.original.currency} />,
  },
  {
    accessorKey: 'clientName',
    header: 'Client Name',
    cell: ({ row }) => <StringCell value={row.original.clientName} />,
  },
  {
    accessorKey: 'clientEmail',
    header: 'Client Email',
    cell: ({ row }) => <StringCell value={row.original.clientEmail} />,
  },
  {
    accessorKey: 'billingAddress',
    header: 'Billing Address',
    cell: ({ row }) => <StringCell value={row.original.billingAddress} />,
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
