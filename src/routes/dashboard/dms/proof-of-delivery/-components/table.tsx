import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import DateCell from '@/components/table/cells/date'
import NumberCell from '@/components/table/cells/number'
import StringCell from '@/components/table/cells/string'
import { Button } from '@/components/ui/button'
import type { ORPCOutputs } from '@/orpc/client'

export const columns: ColumnDef<ORPCOutputs['dms']['paginateProofOfDelivery'][number]>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'deliveryTaskId',
    header: 'Delivery Task ID',
    cell: ({ row }) => (
      <Button size={'sm'} variant={'outline'} className="w-full" asChild>
        <Link
          to="/dashboard/dms/delivery-task"
          search={{
            view: true,
            id: row.original.deliveryTaskId,
            filters: [
              {
                column: 'id',
                operation: '=',
                value: row.original.deliveryTaskId,
              },
            ],
          }}
        >
          <StringCell value={row.original.deliveryTaskId} />
        </Link>
      </Button>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <StringCell value={row.original.type} />,
  },
  {
    accessorKey: 'filePath',
    header: 'File Path',
    cell: ({ row }) => <StringCell value={row.original.filePath} />,
  },
  {
    accessorKey: 'latitude',
    header: 'Latitude',
    cell: ({ row }) => <NumberCell value={row.original.latitude} />,
  },
  {
    accessorKey: 'longitude',
    header: 'Longitude',
    cell: ({ row }) => <NumberCell value={row.original.longitude} />,
  },
  {
    accessorKey: 'recipientName',
    header: 'Recipient Name',
    cell: ({ row }) => <StringCell value={row.original.recipientName} />,
  },
  {
    accessorKey: 'signatureData',
    header: 'Signature Data',
    cell: ({ row }) => <StringCell value={row.original.signatureData} />,
  },
  {
    accessorKey: 'timestamp',
    header: 'Timestamp',
    cell: ({ row }) => <DateCell value={row.original.timestamp} showTime />,
  },
  {
    accessorKey: 'verificationCode',
    header: 'Verification Code',
    cell: ({ row }) => <StringCell value={row.original.verificationCode} />,
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
