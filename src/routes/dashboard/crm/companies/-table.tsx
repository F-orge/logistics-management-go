import { ColumnDef } from '@tanstack/react-table';
import { editCompany, type selectCompanies } from '@/actions/crm/companies';
import TextCell from '@/components/ui/kibo-ui/table/cells/text';
import React from 'react';
import EditTextDialog from '@/components/form/components/text-dialog';
import { useAppForm } from '@/components/form';
import { toast } from 'sonner';
import { useRouter } from '@tanstack/react-router';

export const columns: ColumnDef<
  Awaited<ReturnType<typeof selectCompanies>>[number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const [editState, setEditState] = React.useState<boolean>(false);
      const router = useRouter();

      const form = useAppForm({
        defaultValues: { name: row.original.name },
        onSubmit: async ({ value }) =>
          value.name !== row.original.name &&
          toast.promise(
            editCompany({ data: { id: row.original.id, payload: value } }),
            {
              success: async () => {
                await router.invalidate();
                return {
                  message: 'Update success',
                  description: 'Company name updated succesfully',
                };
              },
            },
          ),
      });

      return (
        <>
          <TextCell
            value={row.original.name}
            onDoubleClick={() => setEditState(true)}
          />
          <EditTextDialog
            onSave={() => form.handleSubmit()}
            form={form}
            name="name"
            defaultOpen={editState}
            title="Edit Company name"
            description="Edit company information"
            onOpenChange={(open) => setEditState(open)}
          />
        </>
      );
    },
  },
  {
    accessorKey: 'industry',
    header: 'Industry',
    cell: ({ row }) => {
      const [editState, setEditState] = React.useState<boolean>(false);
      const router = useRouter();

      const form = useAppForm({
        defaultValues: { industry: row.original.industry },
        onSubmit: async ({ value }) =>
          value.industry !== row.original.industry &&
          toast.promise(
            editCompany({ data: { id: row.original.id, payload: value } }),
            {
              success: async () => {
                await router.invalidate();
                return {
                  message: 'Update success',
                  description: 'Company industry updated succesfully',
                };
              },
            },
          ),
      });

      return (
        <>
          <TextCell
            value={row.original.industry}
            onDoubleClick={() => setEditState(true)}
          />
          <EditTextDialog
            onSave={() => form.handleSubmit()}
            form={form}
            name="industry"
            defaultOpen={editState}
            title="Edit Company Industry"
            description="Edit company information"
            onOpenChange={(open) => setEditState(open)}
          />
        </>
      );
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => <TextCell value={row.original.phoneNumber} />,
  },
  {
    accessorKey: 'annualRevenue',
    header: 'Annual Revenue',
    cell: ({ row }) => <TextCell value={row.original.annualRevenue} />,
  },
  {
    accessorKey: 'postalCode',
    header: 'Postal Code',
    cell: ({ row }) => <TextCell value={row.original.postalCode} />,
  },
  {
    accessorKey: 'street',
    header: 'Street',
    cell: ({ row }) => <TextCell value={row.original.street} />,
  },
  {
    accessorKey: 'city',
    header: 'City',
    cell: ({ row }) => <TextCell value={row.original.city} />,
  },
  {
    accessorKey: 'state',
    header: 'State',
    cell: ({ row }) => <TextCell value={row.original.state} />,
  },
  {
    accessorKey: 'country',
    header: 'Country',
    cell: ({ row }) => <TextCell value={row.original.country} />,
  },
];
