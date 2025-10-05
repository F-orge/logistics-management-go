import { useRouter } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { editCompany, type selectCompanies } from '@/actions/crm/companies';
import TextCell from '@/components/ui/kibo-ui/table/cells/text';
import { TableColumnHeader } from '@/components/ui/kibo-ui/table';
import NumberCell from '@/components/ui/kibo-ui/table/cells/number';

export const columns: ColumnDef<
  Awaited<ReturnType<typeof selectCompanies>>[number]
>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <TableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <TextCell
          key={row.original.id}
          dialogTitle="Edit Company name"
          dialogDescription="Edit Company information"
          value={row.original.name}
          onSubmit={async (value) =>
            toast.promise(
              editCompany({
                data: { id: row.original.id, payload: { name: value } },
              }),
              {
                success: async () => {
                  await router.invalidate();
                  return {
                    message: 'Update success',
                    description: 'Company Name updated succesfully',
                  };
                },
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'industry',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Industry" />
    ),
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <TextCell
          key={row.original.id}
          dialogTitle="Edit Company Industry"
          dialogDescription="Edit Company information"
          value={row.original.industry ?? 'Not Available'}
          onSubmit={async (value) =>
            toast.promise(
              editCompany({
                data: { id: row.original.id, payload: { industry: value } },
              }),
              {
                success: async () => {
                  await router.invalidate();
                  return {
                    message: 'Update success',
                    description: 'Company industry updated succesfully',
                  };
                },
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <TextCell
          key={row.original.id}
          dialogTitle="Edit Company Phone Number"
          dialogDescription="Edit Company information"
          value={row.original.phoneNumber ?? 'Not Available'}
          onSubmit={async (value) =>
            toast.promise(
              editCompany({
                data: { id: row.original.id, payload: { phoneNumber: value } },
              }),
              {
                success: async () => {
                  await router.invalidate();
                  return {
                    message: 'Update success',
                    description: 'Company Phone Number updated succesfully',
                  };
                },
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'annualRevenue',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Annual Revenue" />
    ),
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <NumberCell
          key={row.original.id}
          dialogTitle="Edit Company Annual Revenue"
          dialogDescription="Edit Company information"
          value={Number(row.original.annualRevenue)}
          onSubmit={async (value) =>
            toast.promise(
              editCompany({
                data: {
                  id: row.original.id,
                  payload: { annualRevenue: value },
                },
              }),
              {
                success: async () => {
                  await router.invalidate();
                  return {
                    message: 'Update success',
                    description: 'Company Annual Revenue updated succesfully',
                  };
                },
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'postalCode',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Postal Code" />
    ),
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <TextCell
          key={row.original.id}
          dialogTitle="Edit Company Postal Code"
          dialogDescription="Edit Company information"
          value={row.original.postalCode ?? 'Not Available'}
          onSubmit={async (value) =>
            toast.promise(
              editCompany({
                data: { id: row.original.id, payload: { postalCode: value } },
              }),
              {
                success: async () => {
                  await router.invalidate();
                  return {
                    message: 'Update success',
                    description: 'Company Postal Code updated succesfully',
                  };
                },
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'street',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Street" />
    ),
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <TextCell
          key={row.original.id}
          dialogTitle="Edit Company Street"
          dialogDescription="Edit Company information"
          value={row.original.street ?? 'Not Available'}
          onSubmit={async (value) =>
            toast.promise(
              editCompany({
                data: { id: row.original.id, payload: { street: value } },
              }),
              {
                success: async () => {
                  await router.invalidate();
                  return {
                    message: 'Update success',
                    description: 'Company Street updated succesfully',
                  };
                },
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'city',
    header: ({ column }) => <TableColumnHeader column={column} title="City" />,
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <TextCell
          key={row.original.id}
          dialogTitle="Edit Company City"
          dialogDescription="Edit Company information"
          value={row.original.city ?? 'Not Available'}
          onSubmit={async (value) =>
            toast.promise(
              editCompany({
                data: { id: row.original.id, payload: { city: value } },
              }),
              {
                success: async () => {
                  await router.invalidate();
                  return {
                    message: 'Update success',
                    description: 'Company City updated succesfully',
                  };
                },
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'state',
    header: ({ column }) => <TableColumnHeader column={column} title="State" />,
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <TextCell
          key={row.original.id}
          dialogTitle="Edit Company State"
          dialogDescription="Edit Company information"
          value={row.original.state ?? 'Not Available'}
          onSubmit={async (value) =>
            toast.promise(
              editCompany({
                data: { id: row.original.id, payload: { state: value } },
              }),
              {
                success: async () => {
                  await router.invalidate();
                  return {
                    message: 'Update success',
                    description: 'Company State updated succesfully',
                  };
                },
              },
            )
          }
        />
      );
    },
  },
  {
    accessorKey: 'country',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Country" />
    ),
    cell: ({ row }) => {
      const router = useRouter();

      return (
        <TextCell
          key={row.original.id}
          dialogTitle="Edit Company Country"
          dialogDescription="Edit Company information"
          value={row.original.country ?? 'Not Available'}
          onSubmit={async (value) =>
            toast.promise(
              editCompany({
                data: { id: row.original.id, payload: { country: value } },
              }),
              {
                success: async () => {
                  await router.invalidate();
                  return {
                    message: 'Update success',
                    description: 'Company Country updated succesfully',
                  };
                },
              },
            )
          }
        />
      );
    },
  },
];
