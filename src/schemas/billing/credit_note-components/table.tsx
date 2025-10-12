import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginateCreditNote'][number] & {
    createdBy?: ORPCOutputs['auth']['inUser'][number];
    dispute?: ORPCOutputs['billing']['inDispute'][number];
    invoice?: ORPCOutputs['billing']['inInvoice'][number];
  }
>[] = [
  {
    accessorKey: 'creditNoteNumber',
    header: 'Credit Note Number',
    cell: ({ row }) => <StringCell value={row.original.creditNoteNumber} />,
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
    accessorKey: 'issueDate',
    header: 'Issue Date',
    cell: ({ row }) => <DateCell value={row.original.issueDate} showTime />,
  },
  {
    accessorKey: 'appliedAt',
    header: 'Applied At',
    cell: ({ row }) => <DateCell value={row.original.appliedAt} showTime />,
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ row }) => <StringCell value={row.original.reason} />,
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => <StringCell value={row.original.notes} />,
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
    id: 'dispute',
    header: 'Dispute',
    cell: ({ row }) =>
      row.original.dispute ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/billing/disputes"
            search={{
              view: true,
              id: row.original.dispute.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.dispute.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.dispute.id} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
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
