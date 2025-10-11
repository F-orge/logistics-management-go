import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import PhoneCell from '@/components/table/cells/phone';
import StringCell from '@/components/table/cells/string';
import { orpcClient, ORPCOutputs } from '@/orpc/client';

export const columns: ColumnDef<ORPCOutputs['crm']['paginateCompany'][number]>[] = [
  {
    accessorKey: 'name',
    header: 'Company Name',
    cell: ({ row }) => {
      return <StringCell value={row.original.name} />;
    },
  },
  {
    accessorKey: 'industry',
    header: 'Industry',
    cell: ({ row }) => <StringCell value={row.original.industry} />,
  },
  {
    accessorKey: 'annualRevenue',
    header: 'Annual Revenue',
    cell: ({ row }) => (
      <NumberCell value={row.original.annualRevenue} currency="PHP" />
    ),
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => <PhoneCell value={row.original.phoneNumber} />,
  },
  {
    accessorKey: 'website',
    header: 'Website',
    cell: ({ row }) => <StringCell value={row.original.website} />,
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
      return <StringCell value={addressParts.join(', ')} />;
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
