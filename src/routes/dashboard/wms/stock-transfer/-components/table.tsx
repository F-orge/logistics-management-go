import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateStockTransfer'][number] & {
    sourceWarehouse?: ORPCOutputs['wms']['inWarehouse'][number];
    destinationWarehouse?: ORPCOutputs['wms']['inWarehouse'][number];
    product?: ORPCOutputs['wms']['inProduct'][number];
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'sourceWarehouse',
    header: 'Source Warehouse',
    cell: ({ row }) =>
      row.original.sourceWarehouse ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/warehouse"
            search={{
              view: true,
              id: row.original.sourceWarehouse.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.sourceWarehouse.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.sourceWarehouse.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'destinationWarehouse',
    header: 'Destination Warehouse',
    cell: ({ row }) =>
      row.original.destinationWarehouse ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/warehouse"
            search={{
              view: true,
              id: row.original.destinationWarehouse.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.destinationWarehouse.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.destinationWarehouse.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
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
    accessorKey: 'transferNumber',
    header: 'Transfer Number',
    cell: ({ row }) => <StringCell value={row.original.transferNumber} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => <NumberCell value={row.original.quantity} />,
  },
  {
    accessorKey: 'transferDate',
    header: 'Transfer Date',
    cell: ({ row }) => <DateCell value={row.original.transferDate} showTime />,
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
