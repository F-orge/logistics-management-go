import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import DateCell from '@/components/table/cells/date'
import NumberCell from '@/components/table/cells/number'
import StringCell from '@/components/table/cells/string'
import { Button } from '@/components/ui/button'
import type { ORPCOutputs } from '@/orpc/client'

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginatePackage'][number] & {
    salesOrder?: ORPCOutputs['wms']['inSalesOrder'][number]
    warehouse?: ORPCOutputs['wms']['inWarehouse'][number]
    packedByUser?: ORPCOutputs['auth']['inUser'][number]
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'salesOrder',
    header: 'Sales Order',
    cell: ({ row }) =>
      row.original.salesOrder ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/sales-order"
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
            <StringCell value={row.original.salesOrder.id} />
          </Link>
        </Button>
      ) : (
        <StringCell value="N/A" />
      ),
  },
  {
    accessorKey: 'warehouse',
    header: 'Warehouse',
    cell: ({ row }) =>
      row.original.warehouse ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/warehouse"
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
    accessorKey: 'packedByUser',
    header: 'Packed By',
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
    accessorKey: 'packageNumber',
    header: 'Package Number',
    cell: ({ row }) => <StringCell value={row.original.packageNumber} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
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
    accessorKey: 'weightUnit',
    header: 'Weight Unit',
    cell: ({ row }) => <StringCell value={row.original.weightUnit} />,
  },
  {
    accessorKey: 'dimensions',
    header: 'Dimensions',
    cell: ({ row }) => <StringCell value={row.original.dimensions} />,
  },
  {
    accessorKey: 'packedDate',
    header: 'Packed Date',
    cell: ({ row }) => <DateCell value={row.original.packedDate} showTime />,
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
]
