import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['wms']['paginateSupplier'][number]
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <StringCell value={row.original.id} />,
  },
  {
    accessorKey: 'name',
    header: 'Supplier Name',
    cell: ({ row }) => <StringCell value={row.original.name} />,
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
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => <StringCell value={row.original.address} />,
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
