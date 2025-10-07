import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { selectCrmLead } from '@/actions/crm/leads'; // Assuming this action exists
import DateCell from '@/components/table/cells/date';
import EnumCell from '@/components/table/cells/enum';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { crmLeadUpdateMutationOption } from '@/queries/crm/leads'; // Assuming this query exists
import { CrmLeadSource, CrmLeadStatus } from '@/db/types'; // Import enums

const crmLeadSourceOptions = Object.values(CrmLeadSource).map((type) => ({
  value: type,
  label: type,
}));

const crmLeadStatusOptions = Object.values(CrmLeadStatus).map((type) => ({
  value: type,
  label: type,
}));

export const columns: ColumnDef<
  Awaited<ReturnType<typeof selectCrmLead>>[number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmLeadUpdateMutationOption(row.original.id),
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
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmLeadUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.email}
          onSave={(value) =>
            mutation.mutate(
              { email: value },
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
        crmLeadUpdateMutationOption(row.original.id),
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
    accessorKey: 'campaignId',
    header: 'Campaign ID',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmLeadUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.campaignId}
          onSave={(value) =>
            mutation.mutate(
              { campaignId: value },
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
    accessorKey: 'convertedAt',
    header: 'Converted At',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmLeadUpdateMutationOption(row.original.id),
      );

      return (
        <DateCell
          editable
          value={row.original.convertedAt}
          showTime
          onSave={(value) =>
            mutation.mutate(
              { convertedAt: new Date(value) },
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
    accessorKey: 'convertedCompanyId',
    header: 'Converted Company ID',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmLeadUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.convertedCompanyId || undefined}
          onSave={(value) =>
            mutation.mutate(
              { convertedCompanyId: value },
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
    accessorKey: 'convertedContactId',
    header: 'Converted Contact ID',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmLeadUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.convertedContactId || undefined}
          onSave={(value) =>
            mutation.mutate(
              { convertedContactId: value },
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
    accessorKey: 'convertedOpportunityId',
    header: 'Converted Opportunity ID',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmLeadUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.convertedOpportunityId || undefined}
          onSave={(value) =>
            mutation.mutate(
              { convertedOpportunityId: value },
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
    accessorKey: 'leadScore',
    header: 'Lead Score',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmLeadUpdateMutationOption(row.original.id),
      );

      return (
        <NumberCell
          editable
          value={row.original.leadScore ?? 0}
          onSave={(value) =>
            mutation.mutate(
              { leadScore: value },
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
    accessorKey: 'leadSource',
    header: 'Lead Source',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmLeadUpdateMutationOption(row.original.id),
      );

      return (
        <EnumCell
          editable
          value={row.original.leadSource}
          options={crmLeadSourceOptions}
          onSave={(value) =>
            mutation.mutate(
              { leadSource: value as CrmLeadSource },
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
        crmLeadUpdateMutationOption(row.original.id),
      );

      return (
        <EnumCell
          editable
          value={row.original.status}
          options={crmLeadStatusOptions}
          onSave={(value) =>
            mutation.mutate(
              { status: value as CrmLeadStatus },
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
