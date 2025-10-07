import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { selectCrmCompany } from '@/actions/crm/companies';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import PhoneCell from '@/components/table/cells/phone';
import StringCell from '@/components/table/cells/string';
import UrlCell from '@/components/table/cells/url';
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
  {
    accessorKey: 'annualRevenue',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCompanyUpdateMutationOption(row.original.id),
      );

      return (
        <NumberCell
          editable
          currency="PHP"
          value={row.original.annualRevenue ?? 0}
          onSave={(value) =>
            mutation.mutate(
              { annualRevenue: value },
              {
                onSuccess: (data) => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'city',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCompanyUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.city}
          onSave={(value) =>
            mutation.mutate(
              { city: value },
              {
                onSuccess: (data) => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'country',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCompanyUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.country}
          onSave={(value) =>
            mutation.mutate(
              { country: value },
              {
                onSuccess: (data) => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'industry',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCompanyUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.industry}
          onSave={(value) =>
            mutation.mutate(
              { industry: value },
              {
                onSuccess: (data) => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'phoneNumber',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCompanyUpdateMutationOption(row.original.id),
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
                onSuccess: (data) => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'postalCode',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCompanyUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.postalCode}
          onSave={(value) =>
            mutation.mutate(
              { postalCode: value },
              {
                onSuccess: (data) => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'state',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCompanyUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.state}
          onSave={(value) =>
            mutation.mutate(
              { state: value },
              {
                onSuccess: (data) => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'street',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCompanyUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.street}
          onSave={(value) =>
            mutation.mutate(
              { street: value },
              {
                onSuccess: (data) => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'website',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmCompanyUpdateMutationOption(row.original.id),
      );

      return (
        <UrlCell
          editable
          value={row.original.website}
          onSave={(value) =>
            mutation.mutate(
              { website: value },
              {
                onSuccess: (data) => toast.success('Update Success'),
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'createdAt',
    cell: ({ row }) => <DateCell value={row.original.createdAt} showTime />,
  },
  {
    accessorKey: 'updatedAt',
    cell: ({ row }) => <DateCell value={row.original.updatedAt} showTime />,
  },
];
