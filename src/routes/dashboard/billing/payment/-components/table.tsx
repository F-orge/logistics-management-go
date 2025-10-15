import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import DateCell from '@/components/table/cells/date'
import NumberCell from '@/components/table/cells/number'
import StringCell from '@/components/table/cells/string'
import { Button } from '@/components/ui/button'
import type { ORPCOutputs } from '@/orpc/client'

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginatePayment'][number] & {
    invoice?: ORPCOutputs['billing']['inInvoice'][number]
    processedByUser?: ORPCOutputs['auth']['inUser'][number]
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'invoice',
    header: 'Invoice',
    cell: ({ row }) =>
      row.original.invoice ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/billing/invoice"
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
    accessorKey: 'processedByUser',
    header: 'Processed By',
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
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
    cell: ({ row }) => <StringCell value={row.original.paymentMethod} />,
  },
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
    accessorKey: 'paymentDate',
    header: 'Payment Date',
    cell: ({ row }) => <DateCell value={row.original.paymentDate} showTime />,
  },
  {
    accessorKey: 'transactionId',
    header: 'Transaction ID',
    cell: ({ row }) => <StringCell value={row.original.transactionId} />,
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
]
