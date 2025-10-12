import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import DateCell from '@/components/table/cells/date';
import { Button } from '@/components/ui/button';
import { ORPCOutputs } from '@/orpc/client';
import { WmsProductStatusEnum } from '@/db/types';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateProduct'][number] & {
    client?: ORPCOutputs['crm']['inCompany'][number]; // Assuming client is a company from CRM
    supplier?: ORPCOutputs['wms']['inSupplier'][number];
  }
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <StringCell value={row.original.name} />,
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) => <StringCell value={row.original.sku} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    accessorKey: 'barcode',
    header: 'Barcode',
    cell: ({ row }) => <StringCell value={row.original.barcode} />,
  },
  {
    accessorKey: 'costPrice',
    header: 'Cost Price',
    cell: ({ row }) => <NumberCell value={row.original.costPrice} />,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <StringCell value={row.original.description} />,
  },
  {
    accessorKey: 'height',
    header: 'Height',
    cell: ({ row }) => <NumberCell value={row.original.height} />,
  },
  {
    accessorKey: 'length',
    header: 'Length',
    cell: ({ row }) => <NumberCell value={row.original.length} />,
  },
  {
    accessorKey: 'volume',
    header: 'Volume',
    cell: ({ row }) => <NumberCell value={row.original.volume} />,
  },
  {
    accessorKey: 'weight',
    header: 'Weight',
    cell: ({ row }) => <NumberCell value={row.original.weight} />,
  },
  {
    accessorKey: 'width',
    header: 'Width',
    cell: ({ row }) => <NumberCell value={row.original.width} />,
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
    id: 'supplier',
    header: 'Supplier',
    cell: ({ row }) =>
      row.original.supplier ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/suppliers"
            search={{
              view: true,
              id: row.original.supplier.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: row.original.supplier.id,
                },
              ],
            }}
          >
            <StringCell value={row.original.supplier.name} />
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
