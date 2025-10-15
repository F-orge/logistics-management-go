import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import DateCell from '@/components/table/cells/date'
import StringCell from '@/components/table/cells/string'
import { Button } from '@/components/ui/button'
import type { ORPCOutputs } from '@/orpc/client'

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginateDispute'][number] & {
    lineItem?: ORPCOutputs['billing']['inInvoiceLineItem'][number]
    resolvedByUser?: ORPCOutputs['auth']['inUser'][number]
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'lineItem',
    header: 'Invoice Line Item',
    cell: ({ row }) =>
      row.original.lineItem ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/billing/invoice-line-item"
            search={{
              view: true,
              id: row.original.lineItem.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.lineItem.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.lineItem.description} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'resolvedByUser',
    header: 'Resolved By',
    cell: ({ row }) =>
      row.original.resolvedByUser ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/auth/users"
            search={{
              view: true,
              id: row.original.resolvedByUser.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.resolvedByUser.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.resolvedByUser.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ row }) => <StringCell value={row.original.reason} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'resolution',
    header: 'Resolution',
    cell: ({ row }) => <StringCell value={row.original.resolution} />,
  },
  {
    accessorKey: 'disputeDate',
    header: 'Dispute Date',
    cell: ({ row }) => <DateCell value={row.original.disputeDate} showTime />,
  },
  {
    accessorKey: 'resolvedDate',
    header: 'Resolved Date',
    cell: ({ row }) => <DateCell value={row.original.resolvedDate} showTime />,
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
