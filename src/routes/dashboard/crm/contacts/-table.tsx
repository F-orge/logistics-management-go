import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { selectCrmContact } from '@/actions/crm/contacts'; // Assuming this action exists
import DateCell from '@/components/table/cells/date';
import PhoneCell from '@/components/table/cells/phone';
import StringCell from '@/components/table/cells/string';
import { crmContactUpdateMutationOption } from '@/queries/crm/contacts'; // Assuming this query exists

export const columns: ColumnDef<
  Awaited<ReturnType<typeof selectCrmContact>>[number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmContactUpdateMutationOption(row.original.id),
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
        crmContactUpdateMutationOption(row.original.id),
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
    accessorKey: 'companyId',
    header: 'Company ID',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmContactUpdateMutationOption(row.original.id),
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
    accessorKey: 'jobTitle',
    header: 'Job Title',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmContactUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.jobTitle}
          onSave={(value) =>
            mutation.mutate(
              { jobTitle: value },
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
        crmContactUpdateMutationOption(row.original.id),
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
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmContactUpdateMutationOption(row.original.id),
      );

      return (
        <PhoneCell
          editable
          value={row.original.phoneNumber}
          defaultCountry="PH"
          onSave={(value) =>
            mutation.mutate(
              { phoneNumber: value },
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
