import { ColumnDef } from '@tanstack/react-table';
import StringCell from '@/components/table/cells/string';
import DateCell from '@/components/table/cells/date';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateSupplier'][number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <StringCell value={row.original.name} />,
  },
  {
    accessorKey: 'contactPerson',
    header: 'Contact Person',
    cell: ({ row }) => <StringCell value={row.original.contactPerson} />,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <StringCell value={row.original.email} />,
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => <StringCell value={row.original.phoneNumber} />,
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
