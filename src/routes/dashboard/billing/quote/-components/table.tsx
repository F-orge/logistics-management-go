import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import DateCell from '@/components/table/cells/date'
import NumberCell from '@/components/table/cells/number'
import StringCell from '@/components/table/cells/string'
import { Button } from '@/components/ui/button'
import type { ORPCOutputs } from '@/orpc/client'

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginateQuote'][number] & {
    createdByUser?: ORPCOutputs['auth']['inUser'][number]
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
    accessorKey: 'quoteNumber',
    header: 'Quote Number',
    cell: ({ row }) => <StringCell value={row.original.quoteNumber} />,
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
    accessorKey: 'expiryDate',
    header: 'Expiry Date',
    cell: ({ row }) => <DateCell value={row.original.expiryDate} showTime />,
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
