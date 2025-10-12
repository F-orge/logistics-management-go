import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { BillingInvoiceStatusEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginateInvoice'][number] & {
    client?: ORPCOutputs['crm']['inCompany'][number]; // Assuming client is a company from CRM
    createdBy?: ORPCOutputs['auth']['inUser'][number];
    quote?: ORPCOutputs['billing']['inQuote'][number];
  }
>[] = [
  {
    accessorKey: 'invoiceNumber',
    header: 'Invoice Number',
    cell: ({ row }) => <StringCell value={row.original.invoiceNumber} />,
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total Amount',
    cell: ({ row }) => <NumberCell value={row.original.totalAmount} />,
  },
  {
    accessorKey: 'amountOutstanding',
    header: 'Amount Outstanding',
    cell: ({ row }) => <NumberCell value={row.original.amountOutstanding} />,
  },
  {
    accessorKey: 'amountPaid',
    header: 'Amount Paid',
    cell: ({ row }) => <NumberCell value={row.original.amountPaid} />,
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
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
    cell: ({ row }) => <StringCell value={row.original.currency} />,
  },
  {
    accessorKey: 'discountAmount',
    header: 'Discount Amount',
    cell: ({ row }) => <NumberCell value={row.original.discountAmount} />,
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => <StringCell value={row.original.notes} />,
  },
  {
    accessorKey: 'paidAt',
    header: 'Paid At',
    cell: ({ row }) => <DateCell value={row.original.paidAt} showTime />,
  },
  {
    accessorKey: 'paymentTerms',
    header: 'Payment Terms',
    cell: ({ row }) => <StringCell value={row.original.paymentTerms} />,
  },
  {
    accessorKey: 'sentAt',
    header: 'Sent At',
    cell: ({ row }) => <DateCell value={row.original.sentAt} showTime />,
  },
  {
    accessorKey: 'subtotal',
    header: 'Subtotal',
    cell: ({ row }) => <NumberCell value={row.original.subtotal} />,
  },
  {
    accessorKey: 'taxAmount',
    header: 'Tax Amount',
    cell: ({ row }) => <NumberCell value={row.original.taxAmount} />,
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
    id: 'quote',
    header: 'Quote',
    cell: ({ row }) =>
      row.original.quote ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/billing/quotes"
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
