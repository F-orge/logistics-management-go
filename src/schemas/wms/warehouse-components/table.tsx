import { ColumnDef } from '@tanstack/react-table';
import StringCell from '@/components/table/cells/string';
import DateCell from '@/components/table/cells/date';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateWarehouse'][number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <StringCell value={row.original.name} />,
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => <StringCell value={row.original.address} />,
  },
  {
    accessorKey: 'city',
    header: 'City',
    cell: ({ row }) => <StringCell value={row.original.city} />,
  },
  {
    accessorKey: 'state',
    header: 'State',
    cell: ({ row }) => <StringCell value={row.original.state} />,
  },
  {
    accessorKey: 'postalCode',
    header: 'Postal Code',
    cell: ({ row }) => <StringCell value={row.original.postalCode} />,
  },
  {
    accessorKey: 'country',
    header: 'Country',
    cell: ({ row }) => <StringCell value={row.original.country} />,
  },
  {
    accessorKey: 'contactPerson',
    header: 'Contact Person',
    cell: ({ row }) => <StringCell value={row.original.contactPerson} />,
  },
  {
    accessorKey: 'contactEmail',
    header: 'Contact Email',
    cell: ({ row }) => <StringCell value={row.original.contactEmail} />,
  },
  {
    accessorKey: 'contactPhone',
    header: 'Contact Phone',
    cell: ({ row }) => <StringCell value={row.original.contactPhone} />,
  },
  {
    accessorKey: 'timezone',
    header: 'Timezone',
    cell: ({ row }) => <StringCell value={row.original.timezone} />,
  },
  {
    accessorKey: 'isActive',
    header: 'Active',
    cell: ({ row }) => <StringCell value={row.original.isActive ? 'Yes' : 'No'} />,
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
