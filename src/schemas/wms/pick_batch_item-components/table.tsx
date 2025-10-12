import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import DateCell from '@/components/table/cells/date';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginatePickBatchItem'][number] & {
    pickBatch?: ORPCOutputs['wms']['inPickBatch'][number];
    salesOrder?: ORPCOutputs['wms']['inSalesOrder'][number];
  }
>[] = [
  {
    accessorKey: 'orderPriority',
    header: 'Order Priority',
    cell: ({ row }) => <NumberCell value={row.original.orderPriority} />,
  },
  {
    accessorKey: 'estimatedPickTime',
    header: 'Estimated Pick Time',
    cell: ({ row }) => <NumberCell value={row.original.estimatedPickTime} />,
  },
  {
    accessorKey: 'actualPickTime',
    header: 'Actual Pick Time',
    cell: ({ row }) => <NumberCell value={row.original.actualPickTime} />,
  },
  {
    id: 'pickBatch',
    header: 'Pick Batch',
    cell: ({ row }) =>
      row.original.pickBatch ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/pick-batches"
            search={{
              view: true,
              id: row.original.pickBatch.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.pickBatch.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.pickBatch.id} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    id: 'salesOrder',
    header: 'Sales Order',
    cell: ({ row }) =>
      row.original.salesOrder ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/sales-orders"
            search={{
              view: true,
              id: row.original.salesOrder.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.salesOrder.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.salesOrder.orderNumber} />
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
