import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import PhoneCell from '@/components/table/cells/phone';
import StringCell from '@/components/table/cells/string';
import { orpcClient } from '@/orpc/client';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<
  Awaited<ReturnType<typeof orpcClient.crm.paginateCompany>>[number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Company Name',
    cell: ({ row }) => <StringCell value={row.original.name} />,
  },
  {
    accessorKey: 'annualRevenue',
    header: 'Annual Revenue',
    cell: ({ row }) => (
      <NumberCell value={row.original.annualRevenue} currency="PHP" />
    ),
  },
  {
    accessorKey: 'city',
    header: 'City',
    cell: ({ row }) => <StringCell value={row.original.city} />,
  },
  {
    accessorKey: 'country',
    header: 'Country',
    cell: ({ row }) => <StringCell value={row.original.country} />,
  },
  {
    accessorKey: 'industry',
    header: 'Industry',
    cell: ({ row }) => <StringCell value={row.original.industry} />,
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => <PhoneCell value={row.original.phoneNumber} />,
  },
  {
    accessorKey: 'postalCode',
    header: 'Postal Code',
    cell: ({ row }) => <StringCell value={row.original.postalCode} />,
  },
  {
    accessorKey: 'state',
    header: 'State',
    cell: ({ row }) => <StringCell value={row.original.state} />,
  },
  {
    accessorKey: 'street',
    header: 'Street',
    cell: ({ row }) => <StringCell value={row.original.street} />,
  },
  {
    accessorKey: 'website',
    header: 'Website',
    cell: ({ row }) => <StringCell value={row.original.website} />,
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
