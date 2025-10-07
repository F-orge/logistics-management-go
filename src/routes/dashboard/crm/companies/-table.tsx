import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { selectCrmCompany } from '@/actions/crm/companies';
import StringCell from '@/components/table/cells/string';
import { crmCompanyUpdateMutationOption } from '@/queries/crm/companies';

export const columns: ColumnDef<
  Awaited<ReturnType<typeof selectCrmCompany>>[number]
>[] = [
  {
    accessorKey: 'name',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCompanyUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.name}
          onSave={(value) =>
            mutation.mutate(
              { name: value },
              {
                onSuccess: (data) => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
];
