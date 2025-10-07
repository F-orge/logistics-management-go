import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { selectCrmNotification } from '@/actions/crm/notifications'; // Assuming this action exists
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import UrlCell from '@/components/table/cells/url';
import { crmNotificationUpdateMutationOption } from '@/queries/crm/notifications'; // Assuming this query exists

export const columns: ColumnDef<
  Awaited<ReturnType<typeof selectCrmNotification>>[number]
>[] = [
  {
    accessorKey: 'userId',
    header: 'User ID',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmNotificationUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.userId}
          onSave={(value) =>
            mutation.mutate(
              { userId: value },
              {
                onSuccess: () => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'message',
    header: 'Message',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmNotificationUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.message}
          onSave={(value) =>
            mutation.mutate(
              { message: value },
              {
                onSuccess: () => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'link',
    header: 'Link',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmNotificationUpdateMutationOption(row.original.id),
      );

      return (
        <UrlCell
          editable
          value={row.original.link}
          onSave={(value) =>
            mutation.mutate(
              { link: value },
              {
                onSuccess: () => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'isRead',
    header: 'Is Read',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmNotificationUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.isRead ? 'true' : 'false'}
          onSave={(value) =>
            mutation.mutate(
              { isRead: value === 'true' },
              {
                onSuccess: () => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
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
