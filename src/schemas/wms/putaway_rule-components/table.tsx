import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import DateCell from '@/components/table/cells/date';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { WmsLocationTypeEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginatePutawayRule'][number] & {
    product?: ORPCOutputs['wms']['inProduct'][number];
    warehouse?: ORPCOutputs['wms']['inWarehouse'][number];
    client?: ORPCOutputs['crm']['inCompany'][number]; // Assuming client is a company from CRM
    preferredLocation?: ORPCOutputs['wms']['inLocation'][number];
  }
>[] = [
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => <NumberCell value={row.original.priority} />,
  },
  {
    accessorKey: 'isActive',
    header: 'Active',
    cell: ({ row }) => <StringCell value={row.original.isActive ? 'Yes' : 'No'} />,
  },
  {
    accessorKey: 'locationType',
    header: 'Location Type',
    cell: ({ row }) => <StringCell value={row.original.locationType} />,
  },
  {
    accessorKey: 'maxQuantity',
    header: 'Max Quantity',
    cell: ({ row }) => <NumberCell value={row.original.maxQuantity} />,
  },
  {
    accessorKey: 'minQuantity',
    header: 'Min Quantity',
    cell: ({ row }) => <NumberCell value={row.original.minQuantity} />,
  },
  {
    accessorKey: 'requiresHazmatApproval',
    header: 'Requires Hazmat Approval',
    cell: ({ row }) => <StringCell value={row.original.requiresHazmatApproval ? 'Yes' : 'No'} />,
  },
  {
    accessorKey: 'requiresTemperatureControl',
    header: 'Requires Temperature Control',
    cell: ({ row }) => <StringCell value={row.original.requiresTemperatureControl ? 'Yes' : 'No'} />,
  },
  {
    accessorKey: 'volumeThreshold',
    header: 'Volume Threshold',
    cell: ({ row }) => <NumberCell value={row.original.volumeThreshold} />,
  },
  {
    accessorKey: 'weightThreshold',
    header: 'Weight Threshold',
    cell: ({ row }) => <NumberCell value={row.original.weightThreshold} />,
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
    id: 'client',
    header: 'Client',
    cell: ({ row }) =>
      row.original.client ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/crm/companies"
            search={{
              view: true,
              id: row.original.client.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.client.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.client.name} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    id: 'preferredLocation',
    header: 'Preferred Location',
    cell: ({ row }) =>
      row.original.preferredLocation ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/locations"
            search={{
              view: true,
              id: row.original.preferredLocation.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.preferredLocation.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.preferredLocation.name} />
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
