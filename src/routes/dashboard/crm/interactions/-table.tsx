import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { selectCrmInteraction } from '@/actions/crm/interactions'; // Assuming this action exists
import DateCell from '@/components/table/cells/date';
import EnumCell from '@/components/table/cells/enum';
import StringCell from '@/components/table/cells/string';
import { CrmInteractionType } from '@/db/types'; // Import enum
import { crmInteractionUpdateMutationOption } from '@/queries/crm/interactions'; // Assuming this query exists

const crmInteractionTypeOptions = Object.values(CrmInteractionType).map(
  (type) => ({
    value: type,
    label: type,
  }),
);

export const columns: ColumnDef<
  Awaited<ReturnType<typeof selectCrmInteraction>>[number]
>[] = [
  {
    accessorKey: 'contactId',
    header: 'Contact ID',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmInteractionUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.contactId}
          onSave={(value) =>
            mutation.mutate(
              { contactId: value },
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
    accessorKey: 'caseId',
    header: 'Case ID',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmInteractionUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.caseId}
          onSave={(value) =>
            mutation.mutate(
              { caseId: value },
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
    accessorKey: 'userId',
    header: 'User ID',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmInteractionUpdateMutationOption(row.original.id),
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
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmInteractionUpdateMutationOption(row.original.id),
      );

      return (
        <EnumCell
          editable
          value={row.original.type}
          options={crmInteractionTypeOptions}
          onSave={(value) =>
            mutation.mutate(
              { type: value as CrmInteractionType },
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
    accessorKey: 'interactionDate',
    header: 'Interaction Date',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmInteractionUpdateMutationOption(row.original.id),
      );

      return (
        <DateCell
          editable
          value={row.original.interactionDate}
          onSave={(value) =>
            mutation.mutate(
              { interactionDate: value },
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
    accessorKey: 'notes',
    header: 'Notes',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmInteractionUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.notes}
          onSave={(value) =>
            mutation.mutate(
              { notes: value },
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
    accessorKey: 'outcome',
    header: 'Outcome',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmInteractionUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.outcome}
          onSave={(value) =>
            mutation.mutate(
              { outcome: value },
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
