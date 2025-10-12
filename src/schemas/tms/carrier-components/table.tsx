import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import StringCell from '@/components/table/cells/string';
import { ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<
  ORPCOutputs['tms']['paginateCarrier'][number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Carrier Name',
    cell: ({ row }) => <StringCell value={row.original.name} />,
  },
  {
    accessorKey: 'contactDetails',
    header: 'Contact Details',
    cell: ({ row }) => <StringCell value={row.original.contactDetails} />,
  },
  {
    accessorKey: 'servicesOffered',
    header: 'Services Offered',
    cell: ({ row }) => <StringCell value={row.original.servicesOffered} />,
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
