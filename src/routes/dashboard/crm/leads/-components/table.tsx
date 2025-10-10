import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import PhoneCell from '@/components/table/cells/phone';
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
    accessorKey: 'convertedAt',
    header: 'Converted At',
    cell: ({ row }) => <DateCell value={row.original.convertedAt} showTime />,
  },
  {
    accessorKey: 'convertedCompanyId',
    header: 'Converted Company ID',
    cell: ({ row }) => <StringCell value={row.original.convertedCompanyId} />,
  },
  {
    accessorKey: 'convertedContactId',
    header: 'Converted Contact ID',
    cell: ({ row }) => <StringCell value={row.original.convertedContactId} />,
  },
  {
    accessorKey: 'convertedOpportunityId',
    header: 'Converted Opportunity ID',
    cell: ({ row }) => <StringCell value={row.original.convertedOpportunityId} />,
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
