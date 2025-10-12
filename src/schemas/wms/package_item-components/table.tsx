import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginatePackageItem'][number] & {
    package?: ORPCOutputs['wms']['inPackage'][number];
    product?: ORPCOutputs['wms']['inProduct'][number];
    batch?: ORPCOutputs['wms']['inInventoryBatch'][number];
  }
>[] = [
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => <NumberCell value={row.original.quantity} />,
  },
  {
    accessorKey: 'expiryDate',
    header: 'Expiry Date',
    cell: ({ row }) => <DateCell value={row.original.expiryDate} showTime />,
  },
  {
    accessorKey: 'lotNumber',
    header: 'Lot Number',
    cell: ({ row }) => <StringCell value={row.original.lotNumber} />,
  },
  {
    accessorKey: 'serialNumbers',
    header: 'Serial Numbers',
    cell: ({ row }) => <StringCell value={row.original.serialNumbers?.join(', ')} />,
  },
  {
    accessorKey: 'totalWeight',
    header: 'Total Weight',
    cell: ({ row }) => <NumberCell value={row.original.totalWeight} />,
  },
  {
    accessorKey: 'unitWeight',
    header: 'Unit Weight',
    cell: ({ row }) => <NumberCell value={row.original.unitWeight} />,
  },
  {
    id: 'package',
    header: 'Package',
    cell: ({ row }) =>
      row.original.package ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/packages"
            search={{
              view: true,
              id: row.original.package.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.package.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.package.id} />
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
    id: 'batch',
    header: 'Batch',
    cell: ({ row }) =>
      row.original.batch ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/inventory-batches"
            search={{
              view: true,
              id: row.original.batch.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.batch.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.batch.batchNumber} />
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
