import type { ColumnDef } from '@tanstack/react-table'
import DateCell from '@/components/table/cells/date'
import NumberCell from '@/components/table/cells/number'
import StringCell from '@/components/table/cells/string'
import type { ORPCOutputs } from '@/orpc/client'

export const columns: ColumnDef<ORPCOutputs['tms']['paginateVehicle'][number]>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'model',
    header: 'Model',
    cell: ({ row }) => <StringCell value={row.original.model} />,
  },
  {
    accessorKey: 'capacityVolume',
    header: 'Capacity Volume',
    cell: ({ row }) => <NumberCell value={row.original.capacityVolume} />,
  },
  {
    accessorKey: 'capacityWeight',
    header: 'Capacity Weight',
    cell: ({ row }) => <NumberCell value={row.original.capacityWeight} />,
  },
  {
    accessorKey: 'registrationNumber',
    header: 'Registration Number',
    cell: ({ row }) => <StringCell value={row.original.registrationNumber} />,
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
