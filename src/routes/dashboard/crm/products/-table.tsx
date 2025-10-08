import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { selectCrmProduct } from '@/actions/crm/products'; // Assuming this action exists
import DateCell from '@/components/table/cells/date';
import EnumCell from '@/components/table/cells/enum';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { CrmProductType } from '@/db/types'; // Import enum
import { crmProductUpdateMutationOption } from '@/queries/crm/products'; // Assuming this query exists

const crmProductTypeOptions = Object.values(CrmProductType).map((type) => ({
  value: type,
  label: type,
}));

export const columns: ColumnDef<
  Awaited<ReturnType<typeof selectCrmProduct>>[number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmProductUpdateMutationOption(row.original.id),
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
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmProductUpdateMutationOption(row.original.id),
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
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmProductUpdateMutationOption(row.original.id),
      );

      return (
        <NumberCell
          editable
          currency="PHP"
          value={row.original.price}
          onSave={(value) =>
            mutation.mutate(
              { price: value },
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
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) => {
      const mutation = useMutation(
        crmProductUpdateMutationOption(row.original.id),
      );

      return (
        <StringCell
          editable
          value={row.original.sku}
          onSave={(value) =>
            mutation.mutate(
              { sku: value },
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
        crmProductUpdateMutationOption(row.original.id),
      );

      return (
        <EnumCell
          editable
          value={row.original.type}
          options={crmProductTypeOptions}
          onSave={(value) =>
            mutation.mutate(
              { type: value as CrmProductType },
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
