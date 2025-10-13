import { ColumnDef } from '@tanstack/react-table';
import NumberCell from '@/components/table/cells/number';
import TextCell from '@/components/table/cells/string';
import { DataTableColumnHeader } from '@/components/table';
import { ORPCOutputs } from '@/orpc/client';
import DateCell from '@/components/table/cells/date';

type Company = ORPCOutputs['crm']['paginateCompany'][number];

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Name" />
    ),
    cell: ({ row }) => {
      return <TextCell value={row.original.name} />;
    },
  },
  {
    accessorKey: 'ownerId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner ID" />
    ),
    cell: ({ row }) => <TextCell value={row.original.ownerId} />,
  },
  {
    accessorKey: 'industry',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Industry" />
    ),
    cell: ({ row }) => <TextCell value={row.original.industry} />,
  },
  {
    accessorKey: 'annualRevenue',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Annual Revenue" />
    ),
    cell: ({ row }) => <NumberCell value={row.original.annualRevenue} />,
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => <TextCell value={row.original.phoneNumber} />,
  },
  {
    accessorKey: 'website',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Website" />
    ),
    cell: ({ row }) => <TextCell value={row.original.website} />,
  },
  {
    id: 'address',
    header: 'Address',
    cell: ({ row }) => {
      const addressParts = [
        row.original.street,
        row.original.city,
        row.original.state,
        row.original.postalCode,
        row.original.country,
      ].filter(Boolean);
      return <TextCell value={addressParts.join(', ')} />;
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => <DateCell value={row.original.createdAt} />,
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => <DateCell value={row.original.updatedAt} />,
  },
];
