import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { selectCrmOpportunity } from '@/actions/crm/opportunities'; // Assuming this action exists
import DateCell from '@/components/table/cells/date';
import EnumCell from '@/components/table/cells/enum';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { CrmOpportunitySource, CrmOpportunityStage } from '@/db/types'; // Import enums
import { crmOpportunityUpdateMutationOption } from '@/queries/crm/opportunities'; // Assuming this query exists

const crmOpportunitySourceOptions = Object.values(CrmOpportunitySource).map(
  (type) => ({
    value: type,
    label: type,
  }),
);

const crmOpportunityStageOptions = Object.values(CrmOpportunityStage).map(
  (type) => ({
    value: type,
    label: type,
  }),
);

export const columns: ColumnDef<
  Awaited<ReturnType<typeof selectCrmOpportunity>>[number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmOpportunityUpdateMutationOption(row.original.id),
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
    accessorKey: 'ownerId',
    header: 'Owner ID',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmOpportunityUpdateMutationOption(row.original.id),
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
        crmOpportunityUpdateMutationOption(row.original.id),
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
    accessorKey: 'companyId',
    header: 'Company ID',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmOpportunityUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.companyId}
          onSave={(value) =>
            mutation.mutate(
              { companyId: value },
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
        crmOpportunityUpdateMutationOption(row.original.id),
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
    accessorKey: 'dealValue',
    header: 'Deal Value',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmOpportunityUpdateMutationOption(row.original.id),
      );

      return (
        <NumberCell
          editable
          currency="PHP"
          value={row.original.dealValue ?? 0}
          onSave={(value) =>
            mutation.mutate(
              { dealValue: value },
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
    accessorKey: 'expectedCloseDate',
    header: 'Expected Close Date',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmOpportunityUpdateMutationOption(row.original.id),
      );

      return (
        <DateCell
          editable
          value={row.original.expectedCloseDate}
          onSave={(value) =>
            mutation.mutate(
              { expectedCloseDate: value },
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
    accessorKey: 'lostReason',
    header: 'Lost Reason',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmOpportunityUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.lostReason}
          onSave={(value) =>
            mutation.mutate(
              { lostReason: value },
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
    accessorKey: 'probability',
    header: 'Probability',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmOpportunityUpdateMutationOption(row.original.id),
      );

      return (
        <NumberCell
          editable
          value={row.original.probability ?? 0}
          onSave={(value) =>
            mutation.mutate(
              { probability: value },
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
    accessorKey: 'source',
    header: 'Source',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmOpportunityUpdateMutationOption(row.original.id),
      );

      return (
        <EnumCell
          editable
          value={row.original.source}
          options={crmOpportunitySourceOptions}
          onSave={(value) =>
            mutation.mutate(
              { source: value as CrmOpportunitySource },
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
    accessorKey: 'stage',
    header: 'Stage',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmOpportunityUpdateMutationOption(row.original.id),
      );

      return (
        <EnumCell
          editable
          value={row.original.stage}
          options={crmOpportunityStageOptions}
          onSave={(value) =>
            mutation.mutate(
              { stage: value as CrmOpportunityStage },
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
