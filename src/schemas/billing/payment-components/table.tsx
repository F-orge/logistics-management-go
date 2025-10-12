import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { BillingPaymentMethodEnum, BillingPaymentStatusEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginatePayment'][number] & {
    invoice?: ORPCOutputs['billing']['inInvoice'][number];
    processedByUser?: ORPCOutputs['auth']['inUser'][number];
  }
>[] = [
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => <NumberCell value={row.original.amount} />,
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
    cell: ({ row }) => <StringCell value={row.original.currency} />,
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
    cell: ({ row }) => <StringCell value={row.original.paymentMethod} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'paymentDate',
    header: 'Payment Date',
    cell: ({ row }) => <DateCell value={row.original.paymentDate} showTime />,
  },
  {
    accessorKey: 'processedAt',
    header: 'Processed At',
    cell: ({ row }) => <DateCell value={row.original.processedAt} showTime />,
  },
  {
    accessorKey: 'exchangeRate',
    header: 'Exchange Rate',
    cell: ({ row }) => <NumberCell value={row.original.exchangeRate} />,
  },
  {
    accessorKey: 'fees',
    header: 'Fees',
    cell: ({ row }) => <NumberCell value={row.original.fees} />,
  },
  {
    accessorKey: 'gatewayReference',
    header: 'Gateway Reference',
    cell: ({ row }) => <StringCell value={row.original.gatewayReference} />,
  },
  {
    accessorKey: 'netAmount',
    header: 'Net Amount',
    cell: ({ row }) => <NumberCell value={row.original.netAmount} />,
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => <StringCell value={row.original.notes} />,
  },
  {
    accessorKey: 'transactionId',
    header: 'Transaction ID',
    cell: ({ row }) => <StringCell value={row.original.transactionId} />,
  },
  {
    id: 'invoice',
    header: 'Invoice',
    cell: ({ row }) =>
      row.original.invoice ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/billing/invoices"
            search={{
              view: true,
              id: row.original.invoice.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.invoice.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.invoice.invoiceNumber} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    id: 'processedByUser',
    header: 'Processed By User',
    cell: ({ row }) =>
      row.original.processedByUser ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/auth/users"
            search={{
              view: true,
              id: row.original.processedByUser.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.processedByUser.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.processedByUser.name} />
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
