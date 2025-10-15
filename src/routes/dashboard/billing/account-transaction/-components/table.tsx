import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import DateCell from '@/components/table/cells/date'
import NumberCell from '@/components/table/cells/number'
import StringCell from '@/components/table/cells/string'
import { Button } from '@/components/ui/button'
import type { ORPCOutputs } from '@/orpc/client'

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginateAccountTransaction'][number] & {
    clientAccount?: ORPCOutputs['billing']['inClientAccount'][number]
    processedByUser?: ORPCOutputs['auth']['inUser'][number]
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'clientAccount',
    header: 'Client Account',
    cell: ({ row }) =>
      row.original.clientAccount ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/billing/client-account"
            search={{
              view: true,
              id: row.original.clientAccount.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.clientAccount.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.clientAccount.id} />
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
    accessorKey: 'transactionType',
    header: 'Transaction Type',
    cell: ({ row }) => <StringCell value={row.original.transactionType} />,
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
    accessorKey: 'transactionDate',
    header: 'Transaction Date',
    cell: ({ row }) => <DateCell value={row.original.transactionDate} showTime />,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <StringCell value={row.original.description} />,
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
