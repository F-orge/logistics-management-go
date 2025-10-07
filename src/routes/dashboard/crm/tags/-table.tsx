import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { selectCrmTag } from '@/actions/crm/tags'; // Assuming this action exists
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { crmTagUpdateMutationOption } from '@/queries/crm/tags'; // Assuming this query exists

export const columns: ColumnDef<
  Awaited<ReturnType<typeof selectCrmTag>>[number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmTagUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.name}
          onSave={(value) =>
            mutation.mutate(
              { name: value },
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
