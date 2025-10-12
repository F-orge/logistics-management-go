import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateBinThreshold'][number] & {
    location?: ORPCOutputs['wms']['inLocation'][number];
    product?: ORPCOutputs['wms']['inProduct'][number];
  }
>[] = [
  {
    accessorKey: 'minQuantity',
    header: 'Min Quantity',
    cell: ({ row }) => <NumberCell value={row.original.minQuantity} />,
  },
  {
    accessorKey: 'maxQuantity',
    header: 'Max Quantity',
    cell: ({ row }) => <NumberCell value={row.original.maxQuantity} />,
  },
  {
    accessorKey: 'alertThreshold',
    header: 'Alert Threshold',
    cell: ({ row }) => <NumberCell value={row.original.alertThreshold} />,
  },
  {
    accessorKey: 'reorderQuantity',
    header: 'Reorder Quantity',
    cell: ({ row }) => <NumberCell value={row.original.reorderQuantity} />,
  },
  {
    accessorKey: 'isActive',
    header: 'Active',
    cell: ({ row }) => <StringCell value={row.original.isActive ? 'Yes' : 'No'} />,
  },
  {
    id: 'location',
    header: 'Location',
    cell: ({ row }) =>
      row.original.location ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/locations"
            search={{
              view: true,
              id: row.original.location.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.location.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.location.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    id: 'product',
    header: 'Product',
    cell: ({ row }) =>
      row.original.product ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/products"
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
