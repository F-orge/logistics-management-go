import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { BillingDisputeStatusEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginateDispute'][number] & {
    client?: ORPCOutputs['crm']['inCompany'][number]; // Assuming client is a company from CRM
    lineItem?: ORPCOutputs['billing']['inInvoiceLineItem'][number];
    resolvedByUser?: ORPCOutputs['auth']['inUser'][number];
  }
>[] = [
  {
    accessorKey: 'disputedAmount',
    header: 'Disputed Amount',
    cell: ({ row }) => <NumberCell value={row.original.disputedAmount} />,
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
    accessorKey: 'submittedAt',
    header: 'Submitted At',
    cell: ({ row }) => <DateCell value={row.original.submittedAt} showTime />,
  },
  {
    accessorKey: 'resolvedAt',
    header: 'Resolved At',
    cell: ({ row }) => <DateCell value={row.original.resolvedAt} showTime />,
  },
  {
    accessorKey: 'resolutionNotes',
    header: 'Resolution Notes',
    cell: ({ row }) => <StringCell value={row.original.resolutionNotes} />,
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
    id: 'lineItem',
    header: 'Line Item',
    cell: ({ row }) =>
      row.original.lineItem ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/billing/invoice-line-items"
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
    id: 'resolvedByUser',
    header: 'Resolved By User',
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
