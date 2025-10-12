import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { WmsInventoryAdjustmentReasonEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateInventoryAdjustment'][number] & {
    product?: ORPCOutputs['wms']['inProduct'][number];
    warehouse?: ORPCOutputs['wms']['inWarehouse'][number];
    user?: ORPCOutputs['auth']['inUser'][number];
  }
>[] = [
  {
    accessorKey: 'quantityChange',
    header: 'Quantity Change',
    cell: ({ row }) => <NumberCell value={row.original.quantityChange} />,
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
    id: 'warehouse',
    header: 'Warehouse',
    cell: ({ row }) =>
      row.original.warehouse ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/warehouses"
            search={{
              view: true,
              id: row.original.warehouse.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.warehouse.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.warehouse.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    id: 'user',
    header: 'User',
    cell: ({ row }) =>
      row.original.user ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/auth/users"
            search={{
              view: true,
              id: row.original.user.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.user.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.user.name} />
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
