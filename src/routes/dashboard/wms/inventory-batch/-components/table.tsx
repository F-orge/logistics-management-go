import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateInventoryBatch'][number] & {
    product?: ORPCOutputs['wms']['inProduct'][number];
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'product',
    header: 'Product',
    cell: ({ row }) =>
      row.original.product ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/product"
            search={{
              view: true,
              id: row.original.product.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.product.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.product.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'batchNumber',
    header: 'Batch Number',
    cell: ({ row }) => <StringCell value={row.original.batchNumber} />,
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => <NumberCell value={row.original.quantity} />,
  },
  {
    accessorKey: 'expirationDate',
    header: 'Expiration Date',
    cell: ({ row }) => (
      <DateCell value={row.original.expirationDate} showTime />
    ),
  },
  {
    accessorKey: 'manufactureDate',
    header: 'Manufacture Date',
    cell: ({ row }) => (
      <DateCell value={row.original.manufactureDate} showTime />
    ),
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
];
