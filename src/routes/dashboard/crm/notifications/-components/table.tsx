import { ColumnDef } from '@tanstack/react-table';
import BooleanCell from '@/components/table/cells/boolean';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { orpcClient } from '@/orpc/client';

export const columns: ColumnDef<
  Awaited<ReturnType<typeof orpcClient.crm.paginateNotification>>[number]
>[] = [
  {
    accessorKey: 'id',
    header: 'Notification ID',
    cell: ({ row }) => {
      return <StringCell value={row.original.id} />;
    },
  },
  {
    accessorKey: 'userId',
    header: 'User ID',
    cell: ({ row }) => <StringCell value={row.original.userId} />,
  },
  {
    accessorKey: 'message',
    header: 'Message',
    cell: ({ row }) => <StringCell value={row.original.message} />,
  },
  {
    accessorKey: 'link',
    header: 'Link',
    cell: ({ row }) => <StringCell value={row.original.link} />,
  },
  {
    accessorKey: 'isRead',
    header: 'Is Read',
    cell: ({ row }) => <BooleanCell value={row.original.isRead} />,
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
