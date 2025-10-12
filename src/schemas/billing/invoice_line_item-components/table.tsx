import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginateInvoiceLineItem'][number] & {
    invoice?: ORPCOutputs['billing']['inInvoice'][number];
  }
>[] = [
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <StringCell value={row.original.description} />,
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => <NumberCell value={row.original.quantity} />,
  },
  {
    accessorKey: 'unitPrice',
    header: 'Unit Price',
    cell: ({ row }) => <NumberCell value={row.original.unitPrice} />,
  },
  {
    accessorKey: 'lineTotal',
    header: 'Line Total',
    cell: ({ row }) => <NumberCell value={row.original.lineTotal} />,
  },
  {
    accessorKey: 'discountAmount',
    header: 'Discount Amount',
    cell: ({ row }) => <NumberCell value={row.original.discountAmount} />,
  },
  {
    accessorKey: 'discountRate',
    header: 'Discount Rate',
    cell: ({ row }) => <NumberCell value={row.original.discountRate} />,
  },
  {
    accessorKey: 'taxAmount',
    header: 'Tax Amount',
    cell: ({ row }) => <NumberCell value={row.original.taxAmount} />,
  },
  {
    accessorKey: 'taxRate',
    header: 'Tax Rate',
    cell: ({ row }) => <NumberCell value={row.original.taxRate} />,
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total Price',
    cell: ({ row }) => <NumberCell value={row.original.totalPrice} />,
  },
  {
    accessorKey: 'sourceRecordType',
    header: 'Source Record Type',
    cell: ({ row }) => <StringCell value={row.original.sourceRecordType} />,
  },
  {
    accessorKey: 'sourceRecordId',
    header: 'Source Record ID',
    cell: ({ row }) => <StringCell value={row.original.sourceRecordId} />,
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
