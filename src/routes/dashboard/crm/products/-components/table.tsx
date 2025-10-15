import type { ColumnDef } from '@tanstack/react-table'
import DateCell from '@/components/table/cells/date'
import NumberCell from '@/components/table/cells/number'
import StringCell from '@/components/table/cells/string'
import type { orpcClient } from '@/orpc/client'

export const columns: ColumnDef<
  Awaited<ReturnType<typeof orpcClient.crm.paginateProduct>>[number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Product Name',
    cell: ({ row }) => {
      return <StringCell value={row.original.name} />
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <StringCell value={row.original.description} />,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => <NumberCell value={row.original.price} currency="PHP" />,
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) => <StringCell value={row.original.sku} />,
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <StringCell value={row.original.type} />,
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
