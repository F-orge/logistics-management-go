import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { WmsLocationTypeEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateLocation'][number] & {
    warehouse?: ORPCOutputs['wms']['inWarehouse'][number];
    parentLocation?: ORPCOutputs['wms']['inLocation'][number];
  }
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <StringCell value={row.original.name} />,
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <StringCell value={row.original.type} />,
  },
  {
    accessorKey: 'barcode',
    header: 'Barcode',
    cell: ({ row }) => <StringCell value={row.original.barcode} />,
  },
  {
    accessorKey: 'isActive',
    header: 'Active',
    cell: ({ row }) => <StringCell value={row.original.isActive ? 'Yes' : 'No'} />,
  },
  {
    accessorKey: 'isPickable',
    header: 'Pickable',
    cell: ({ row }) => <StringCell value={row.original.isPickable ? 'Yes' : 'No'} />,
  },
  {
    accessorKey: 'isReceivable',
    header: 'Receivable',
    cell: ({ row }) => <StringCell value={row.original.isReceivable ? 'Yes' : 'No'} />,
  },
  {
    accessorKey: 'hazmatApproved',
    header: 'Hazmat Approved',
    cell: ({ row }) => <StringCell value={row.original.hazmatApproved ? 'Yes' : 'No'} />,
  },
  {
    accessorKey: 'temperatureControlled',
    header: 'Temperature Controlled',
    cell: ({ row }) => <StringCell value={row.original.temperatureControlled ? 'Yes' : 'No'} />,
  },
  {
    accessorKey: 'level',
    header: 'Level',
    cell: ({ row }) => <NumberCell value={row.original.level} />,
  },
  {
    accessorKey: 'maxPallets',
    header: 'Max Pallets',
    cell: ({ row }) => <NumberCell value={row.original.maxPallets} />,
  },
  {
    accessorKey: 'maxVolume',
    header: 'Max Volume',
    cell: ({ row }) => <NumberCell value={row.original.maxVolume} />,
  },
  {
    accessorKey: 'maxWeight',
    header: 'Max Weight',
    cell: ({ row }) => <NumberCell value={row.original.maxWeight} />,
  },
  {
    accessorKey: 'path',
    header: 'Path',
    cell: ({ row }) => <StringCell value={row.original.path} />,
  },
  {
    accessorKey: 'xCoordinate',
    header: 'X Coordinate',
    cell: ({ row }) => <NumberCell value={row.original.xCoordinate} />,
  },
  {
    accessorKey: 'yCoordinate',
    header: 'Y Coordinate',
    cell: ({ row }) => <NumberCell value={row.original.yCoordinate} />,
  },
  {
    accessorKey: 'zCoordinate',
    header: 'Z Coordinate',
    cell: ({ row }) => <NumberCell value={row.original.zCoordinate} />,
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
    id: 'parentLocation',
    header: 'Parent Location',
    cell: ({ row }) =>
      row.original.parentLocation ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/locations"
            search={{
              view: true,
              id: row.original.parentLocation.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.parentLocation.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.parentLocation.name} />
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
