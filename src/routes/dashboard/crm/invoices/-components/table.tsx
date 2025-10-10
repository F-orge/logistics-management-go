import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { orpcClient } from '@/orpc/client';
import { ColumnDef } from '@tanstack/react-table';
import { CrmOpportunity } from '@/schemas/crm/opportunities';
import { CrmInvoiceItem } from '@/schemas/crm/invoice_items';
import { CrmProduct } from '@/schemas/crm/products';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

export const columns: ColumnDef<
  Awaited<ReturnType<typeof orpcClient.crm.paginateInvoice>>[number] & {
    opportunity: CrmOpportunity | null;
    items: (CrmInvoiceItem & { product: CrmProduct | null })[] | null;
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
    accessorKey: 'items',
    header: 'Items',
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        {row.original.items?.length ? (
          row.original.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <StringCell value={item.product?.name || 'Unknown Product'} />
              <StringCell value={`x${item.quantity}`} />
            </div>
          ))
        ) : (
          <StringCell value={'No Items'} />
        )}
      </div>
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