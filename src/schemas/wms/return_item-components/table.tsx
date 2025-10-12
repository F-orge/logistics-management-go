import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import DateCell from '@/components/table/cells/date';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { WmsReturnItemConditionEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateReturnItem'][number] & {
    return?: ORPCOutputs['wms']['inReturn'][number];
    product?: ORPCOutputs['wms']['inProduct'][number];
  }
>[] = [
  {
    accessorKey: 'quantityExpected',
    header: 'Quantity Expected',
    cell: ({ row }) => <NumberCell value={row.original.quantityExpected} />,
  },
  {
    accessorKey: 'quantityReceived',
    header: 'Quantity Received',
    cell: ({ row }) => <NumberCell value={row.original.quantityReceived} />,
  },
  {
    accessorKey: 'quantityVariance',
    header: 'Quantity Variance',
    cell: ({ row }) => <NumberCell value={row.original.quantityVariance} />,
  },
  {
    accessorKey: 'condition',
    header: 'Condition',
    cell: ({ row }) => <StringCell value={row.original.condition} />,
  },
  {
    id: 'return',
    header: 'Return',
    cell: ({ row }) =>
      row.original.return ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/returns"
            search={{
              view: true,
              id: row.original.return.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.return.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.return.id} />
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
