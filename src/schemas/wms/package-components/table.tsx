import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginatePackage'][number] & {
    salesOrder?: ORPCOutputs['wms']['inSalesOrder'][number];
    warehouse?: ORPCOutputs['wms']['inWarehouse'][number];
    packedByUser?: ORPCOutputs['auth']['inUser'][number];
  }
>[] = [
  {
    accessorKey: 'packageNumber',
    header: 'Package Number',
    cell: ({ row }) => <StringCell value={row.original.packageNumber} />,
  },
  {
    accessorKey: 'trackingNumber',
    header: 'Tracking Number',
        cell: ({ row }) => <StringCell value={row.original.trackingNumber} />,
  },
  {
    accessorKey: 'carrier',
    header: 'Carrier',
    cell: ({ row }) => <StringCell value={row.original.carrier} />,
  },
  {
    accessorKey: 'serviceLevel',
    header: 'Service Level',
    cell: ({ row }) => <StringCell value={row.original.serviceLevel} />,
  },
  {
    accessorKey: 'packageType',
    header: 'Package Type',
    cell: ({ row }) => <StringCell value={row.original.packageType} />,
  },
  {
    accessorKey: 'weight',
    header: 'Weight',
    cell: ({ row }) => <NumberCell value={row.original.weight} />,
  },
  {
    accessorKey: 'length',
    header: 'Length',
    cell: ({ row }) => <NumberCell value={row.original.length} />,
  },
  {
    accessorKey: 'width',
    header: 'Width',
    cell: ({ row }) => <NumberCell value={row.original.width} />,
  },
  {
    accessorKey: 'height',
    header: 'Height',
    cell: ({ row }) => <NumberCell value={row.original.height} />,
  },
  {
    accessorKey: 'volume',
    header: 'Volume',
    cell: ({ row }) => <NumberCell value={row.original.volume} />,
  },
  {
    accessorKey: 'insuranceValue',
    header: 'Insurance Value',
    cell: ({ row }) => <NumberCell value={row.original.insuranceValue} />,
  },
  {
    accessorKey: 'isFragile',
    header: 'Fragile',
    cell: ({ row }) => <StringCell value={row.original.isFragile ? 'Yes' : 'No'} />,
  },
  {
    accessorKey: 'isHazmat',
    header: 'Hazmat',
    cell: ({ row }) => <StringCell value={row.original.isHazmat ? 'Yes' : 'No'} />,
  },
  {
    accessorKey: 'requiresSignature',
    header: 'Requires Signature',
    cell: ({ row }) => <StringCell value={row.original.requiresSignature ? 'Yes' : 'No'} />,
  },
  {
    accessorKey: 'packedAt',
    header: 'Packed At',
    cell: ({ row }) => <DateCell value={row.original.packedAt} showTime />,
  },
  {
    accessorKey: 'shippedAt',
    header: 'Shipped At',
    cell: ({ row }) => <DateCell value={row.original.shippedAt} showTime />,
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
    id: 'packedByUser',
    header: 'Packed By User',
    cell: ({ row }) =>
      row.original.packedByUser ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/auth/users"
            search={{
              view: true,
              id: row.original.packedByUser.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.packedByUser.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.packedByUser.name} />
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
