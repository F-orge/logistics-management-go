import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['billing']['paginateAccountingSyncLog'][number]
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'entityType',
    header: 'Entity Type',
    cell: ({ row }) => <StringCell value={row.original.entityType} />,
  },
  {
    accessorKey: 'entityId',
    header: 'Entity ID',
    cell: ({ row }) => <StringCell value={row.original.entityId} />,
  },
  {
    accessorKey: 'syncStatus',
    header: 'Sync Status',
    cell: ({ row }) => <StringCell value={row.original.syncStatus} />,
  },
  {
    accessorKey: 'syncDate',
    header: 'Sync Date',
    cell: ({ row }) => <DateCell value={row.original.syncDate} showTime />,
  },
  {
    accessorKey: 'errorMessage',
    header: 'Error Message',
    cell: ({ row }) => <StringCell value={row.original.errorMessage} />,
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
