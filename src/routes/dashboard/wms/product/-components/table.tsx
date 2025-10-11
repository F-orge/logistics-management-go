import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import NumberCell from '@/components/table/cells/number';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateProduct'][number] & {
    supplier?: ORPCOutputs['wms']['inSupplier'][number];
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'name',
    header: 'Product Name',
    cell: ({ row }) => <StringCell value={row.original.name} />,
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) => <StringCell value={row.original.sku} />,
  },
  {
    accessorKey: 'supplier',
    header: 'Supplier',
    cell: ({ row }) =>
      row.original.supplier ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/supplier"
            search={{
              view: true,
              id: row.original.supplier.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.supplier.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.supplier.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <StringCell value={row.original.description} />,
  },
  {
    accessorKey: 'weight',
    header: 'Weight',
    cell: ({ row }) => <NumberCell value={row.original.weight} />,
  },
  {
    accessorKey: 'weightUnit',
    header: 'Weight Unit',
    cell: ({ row }) => <StringCell value={row.original.weightUnit} />,
  },
  {
    accessorKey: 'dimensions',
    header: 'Dimensions',
    cell: ({ row }) => <StringCell value={row.original.dimensions} />,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => <NumberCell value={row.original.price} />,
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
    cell: ({ row }) => <StringCell value={row.original.currency} />,
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
