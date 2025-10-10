import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { orpcClient } from '@/orpc/client';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<
  Awaited<ReturnType<typeof orpcClient.crm.paginateOpportunity>>[number]
>[] = [
  {
    accessorKey: 'name',
    header: 'Opportunity Name',
    cell: ({ row }) => {
      return <StringCell value={row.original.name} />;
    },
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
    accessorKey: 'companyId',
    header: 'Company ID',
    cell: ({ row }) => <StringCell value={row.original.companyId} />,
  },
  {
    accessorKey: 'contactId',
    header: 'Contact ID',
    cell: ({ row }) => <StringCell value={row.original.contactId} />,
  },
  {
    accessorKey: 'dealValue',
    header: 'Deal Value',
    cell: ({ row }) => <NumberCell value={row.original.dealValue} currency="PHP" />,
  },
  {
    accessorKey: 'expectedCloseDate',
    header: 'Expected Close Date',
    cell: ({ row }) => <DateCell value={row.original.expectedCloseDate} showTime />,
  },
  {
    accessorKey: 'lostReason',
    header: 'Lost Reason',
    cell: ({ row }) => <StringCell value={row.original.lostReason} />,
  },
  {
    accessorKey: 'probability',
    header: 'Probability',
    cell: ({ row }) => <NumberCell value={row.original.probability} />,
  },
  {
    accessorKey: 'source',
    header: 'Source',
    cell: ({ row }) => <StringCell value={row.original.source} />,
  },
  {
    accessorKey: 'stage',
    header: 'Stage',
    cell: ({ row }) => <StringCell value={row.original.stage} />,
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