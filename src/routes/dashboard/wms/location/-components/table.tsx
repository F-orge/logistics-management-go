import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import DateCell from '@/components/table/cells/date'
import StringCell from '@/components/table/cells/string'
import { Button } from '@/components/ui/button'
import type { ORPCOutputs } from '@/orpc/client'

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateLocation'][number] & {
    warehouse?: ORPCOutputs['wms']['inWarehouse'][number]
    parentLocation?: ORPCOutputs['wms']['inLocation'][number]
  }
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'name',
    header: 'Location Name',
    cell: ({ row }) => <StringCell value={row.original.name} />,
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
    accessorKey: 'parentLocation',
    header: 'Parent Location',
    cell: ({ row }) =>
      row.original.parentLocation ? (
        <Button size={'sm'} variant={'outline'} className="w-full" asChild>
          <Link
            to="/dashboard/wms/location"
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
    accessorKey: 'locationType',
    header: 'Location Type',
    cell: ({ row }) => <StringCell value={row.original.locationType} />,
  },
  {
    accessorKey: 'zone',
    header: 'Zone',
    cell: ({ row }) => <StringCell value={row.original.zone} />,
  },
  {
    accessorKey: 'aisle',
    header: 'Aisle',
    cell: ({ row }) => <StringCell value={row.original.aisle} />,
  },
  {
    accessorKey: 'rack',
    header: 'Rack',
    cell: ({ row }) => <StringCell value={row.original.rack} />,
  },
  {
    accessorKey: 'shelf',
    header: 'Shelf',
    cell: ({ row }) => <StringCell value={row.original.shelf} />,
  },
  {
    accessorKey: 'bin',
    header: 'Bin',
    cell: ({ row }) => <StringCell value={row.original.bin} />,
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
