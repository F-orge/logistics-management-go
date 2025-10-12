import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { WmsInventoryStockStatusEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateInventoryStock'][number] & {
    product?: ORPCOutputs['wms']['inProduct'][number];
    location?: ORPCOutputs['wms']['inLocation'][number];
    batch?: ORPCOutputs['wms']['inInventoryBatch'][number];
  }
>[] = [
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => <NumberCell value={row.original.quantity} />,
  },
  {
    accessorKey: 'reservedQuantity',
    header: 'Reserved Quantity',
    cell: ({ row }) => <NumberCell value={row.original.reservedQuantity} />,
  },
  {
    accessorKey: 'availableQuantity',
    header: 'Available Quantity',
    cell: ({ row }) => <NumberCell value={row.original.availableQuantity} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'lastCountedAt',
    header: 'Last Counted At',
    cell: ({ row }) => <DateCell value={row.original.lastCountedAt} showTime />,
  },
  {
    accessorKey: 'lastMovementAt',
    header: 'Last Movement At',
    cell: ({ row }) => <DateCell value={row.original.lastMovementAt} showTime />,
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
