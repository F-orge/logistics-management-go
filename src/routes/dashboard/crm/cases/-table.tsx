import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { selectCrmCase } from '@/actions/crm/cases'; // Assuming this action exists
import DateCell from '@/components/table/cells/date';
import EnumCell from '@/components/table/cells/enum';
import StringCell from '@/components/table/cells/string';
import { crmCaseUpdateMutationOption } from '@/queries/crm/cases'; // Assuming this query exists
import { CrmCasePriority, CrmCaseStatus, CrmCaseType } from '@/db/types'; // Import enums

const crmCasePriorityOptions = Object.values(CrmCasePriority).map((type) => ({
  value: type,
  label: type,
}));

const crmCaseStatusOptions = Object.values(CrmCaseStatus).map((type) => ({
  value: type,
  label: type,
}));

const crmCaseTypeOptions = Object.values(CrmCaseType).map((type) => ({
  value: type,
  label: type,
}));

export const columns: ColumnDef<
  Awaited<ReturnType<typeof selectCrmCase>>[number]
>[] = [
  {
    accessorKey: 'caseNumber',
    header: 'Case Number',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCaseUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.caseNumber}
          onSave={(value) =>
            mutation.mutate(
              { caseNumber: value },
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
    accessorKey: 'contactId',
    header: 'Contact ID',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCaseUpdateMutationOption(row.original.id),
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
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCaseUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.description}
          onSave={(value) =>
            mutation.mutate(
              { description: value },
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
    accessorKey: 'ownerId',
    header: 'Owner ID',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCaseUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.ownerId}
          onSave={(value) =>
            mutation.mutate(
              { ownerId: value },
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
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCaseUpdateMutationOption(row.original.id),
      );

      return (
        <EnumCell
          editable
          value={row.original.priority}
          options={crmCasePriorityOptions}
          onSave={(value) =>
            mutation.mutate(
              { priority: value as CrmCasePriority },
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
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCaseUpdateMutationOption(row.original.id),
      );

      return (
        <EnumCell
          editable
          value={row.original.status}
          options={crmCaseStatusOptions}
          onSave={(value) =>
            mutation.mutate(
              { status: value as CrmCaseStatus },
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
        crmCaseUpdateMutationOption(row.original.id),
      );

      return (
        <EnumCell
          editable
          value={row.original.type}
          options={crmCaseTypeOptions}
          onSave={(value) =>
            mutation.mutate(
              { type: value as CrmCaseType },
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
