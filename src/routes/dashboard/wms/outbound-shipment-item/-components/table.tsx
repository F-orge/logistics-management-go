import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import NumberCell from '@/components/table/cells/number';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateOutboundShipmentItem'][number] & {
    outboundShipment?: ORPCOutputs['wms']['inOutboundShipment'][number];
    product?: ORPCOutputs['wms']['inProduct'][number];
    batch?: ORPCOutputs['wms']['inInventoryBatch'][number];
    salesOrderItem?: ORPCOutputs['wms']['inSalesOrderItem'][number];
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'outboundShipment',
    header: 'Outbound Shipment',
    cell: ({ row }) =>
      row.original.outboundShipment ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/outbound-shipment"
            search={{
              view: true,
              id: row.original.outboundShipment.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.outboundShipment.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.outboundShipment.shipmentNumber} />
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
    accessorKey: 'batch',
    header: 'Batch',
    cell: ({ row }) =>
      row.original.batch ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/inventory-batch"
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
    accessorKey: 'salesOrderItem',
    header: 'Sales Order Item',
    cell: ({ row }) =>
      row.original.salesOrderItem ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/sales-order-item"
            search={{
              view: true,
              id: row.original.salesOrderItem.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.salesOrderItem.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.salesOrderItem.id} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => <NumberCell value={row.original.quantity} />,
  },
  {
    accessorKey: 'pickedQuantity',
    header: 'Picked Quantity',
    cell: ({ row }) => <NumberCell value={row.original.pickedQuantity} />,
  },
  {
    accessorKey: 'packedQuantity',
    header: 'Packed Quantity',
    cell: ({ row }) => <NumberCell value={row.original.packedQuantity} />,
  },
  {
    accessorKey: 'shippedQuantity',
    header: 'Shipped Quantity',
    cell: ({ row }) => <NumberCell value={row.original.shippedQuantity} />,
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
