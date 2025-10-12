import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateInboundShipmentItem'][number] & {
    inboundShipment?: ORPCOutputs['wms']['inInboundShipment'][number];
    product?: ORPCOutputs['wms']['inProduct'][number];
  }
>[] = [
  {
    accessorKey: 'expectedQuantity',
    header: 'Expected Quantity',
    cell: ({ row }) => <NumberCell value={row.original.expectedQuantity} />,
  },
  {
    accessorKey: 'receivedQuantity',
    header: 'Received Quantity',
    cell: ({ row }) => <NumberCell value={row.original.receivedQuantity} />,
  },
  {
    accessorKey: 'discrepancyQuantity',
    header: 'Discrepancy Quantity',
    cell: ({ row }) => <NumberCell value={row.original.discrepancyQuantity} />,
  },
  {
    accessorKey: 'discrepancyNotes',
    header: 'Discrepancy Notes',
    cell: ({ row }) => <StringCell value={row.original.discrepancyNotes} />,
  },
  {
    id: 'inboundShipment',
    header: 'Inbound Shipment',
    cell: ({ row }) =>
      row.original.inboundShipment ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/inbound-shipments"
            search={{
              view: true,
              id: row.original.inboundShipment.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.inboundShipment.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.inboundShipment.id} />
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
