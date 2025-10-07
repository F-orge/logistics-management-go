import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { selectCrmCampaign } from '@/actions/crm/campaigns'; // Assuming this action exists
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { crmCampaignUpdateMutationOption } from '@/queries/crm/campaigns'; // Assuming this query exists

export const columns: ColumnDef<
  Awaited<ReturnType<typeof selectCrmCampaign>>[number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCampaignUpdateMutationOption(row.original.id),
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
    accessorKey: 'budget',
    header: 'Budget',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCampaignUpdateMutationOption(row.original.id),
      );

      return (
        <NumberCell
          editable
          currency="PHP"
          value={row.original.budget ?? 0}
          onSave={(value) =>
            mutation.mutate(
              { budget: value.toString() },
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
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCampaignUpdateMutationOption(row.original.id),
      );

      return (
        <DateCell
          editable
          value={row.original.startDate}
          onSave={(value) =>
            mutation.mutate(
              { startDate: value },
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
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCampaignUpdateMutationOption(row.original.id),
      );

      return (
        <DateCell
          editable
          value={row.original.endDate}
          onSave={(value) =>
            mutation.mutate(
              { endDate: value },
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
