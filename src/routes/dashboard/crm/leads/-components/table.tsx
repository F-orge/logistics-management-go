import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { orpcClient } from '@/orpc/client';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<
  Awaited<ReturnType<typeof orpcClient.crm.paginateLead>>[number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Lead Name',
    cell: ({ row }) => {
      return <StringCell value={row.original.name} />;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <StringCell value={row.original.email} />,
  },
  {
    accessorKey: 'ownerId',
    header: 'Owner ID',
    cell: ({ row }) => <StringCell value={row.original.ownerId} />,
  },
  {
    accessorKey: 'campaignId',
    header: 'Campaign ID',
    cell: ({ row }) => <StringCell value={row.original.campaignId} />,
  },
  {
    accessorKey: 'leadScore',
    header: 'Lead Score',
    cell: ({ row }) => <NumberCell value={row.original.leadScore} />,
  },
  {
    accessorKey: 'leadSource',
    header: 'Lead Source',
    cell: ({ row }) => <StringCell value={row.original.leadSource} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StringCell value={row.original.status} />,
  },
  {
    id: 'conversionInfo',
    header: 'Conversion Info',
    cell: ({ row }) => {
      const conversionParts = [
        row.original.convertedAt ? `Converted: ${new Date(row.original.convertedAt).toLocaleString()}` : null,
        row.original.convertedCompanyId ? `Company ID: ${row.original.convertedCompanyId}` : null,
        row.original.convertedContactId ? `Contact ID: ${row.original.convertedContactId}` : null,
        row.original.convertedOpportunityId ? `Opportunity ID: ${row.original.convertedOpportunityId}` : null,
      ].filter(Boolean);
      return <StringCell value={conversionParts.join(' | ')} />;
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
