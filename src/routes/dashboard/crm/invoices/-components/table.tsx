import { Link } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { type ORPCOutputs, orpcClient } from '@/orpc/client';
import type { CrmInvoiceItem } from '@/schemas/crm/invoice_items';
import type { CrmOpportunity } from '@/schemas/crm/opportunities';
import type { CrmProduct } from '@/schemas/crm/products';

export const columns: ColumnDef<
  ORPCOutputs['crm']['paginateInvoice'][number] & {
    opportunity?: ORPCOutputs['crm']['inOpportunity'][number];
    items?: (ORPCOutputs['crm']['inInvoiceItem'][number] & {
      product?: ORPCOutputs['crm']['inProduct'][number];
    })[];
  }
>[] = [
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
    accessorKey: 'paidAt',
    header: 'Paid At',
    cell: ({ row }) => <DateCell value={row.original.paidAt} showTime />,
  },
  {
    accessorKey: 'sentAt',
    header: 'Sent At',
    cell: ({ row }) => <DateCell value={row.original.sentAt} showTime />,
  },
  {
    accessorKey: 'opportunity.name',
    header: 'Opportunity',
    cell: ({ row }) => (
      <>
        {row.original.opportunity ? (
          <Button size={'sm'} variant={'outline'} className="w-full" asChild>
            <Link
              to="/dashboard/crm/opportunities"
              search={{
                view: true,
                id: row.original.opportunity.id,
                filters: [
                  {
                    column: 'id',
                    operation: '=',
                    value: row.original.opportunity.id,
                  },
                ],
              }}
            >
              <StringCell value={row.original.opportunity?.name} />
            </Link>
          </Button>
        ) : (
          <StringCell value={'Not Available'} />
        )}
      </>
    ),
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
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => <NumberCell value={row.original.total} currency="PHP" />,
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
