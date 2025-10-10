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
    id: 'relatedEntities',
    header: 'Related Entities',
    cell: ({ row }) => {
      const entities = [
        row.original.ownerId ? `Owner ID: ${row.original.ownerId}` : null,
        row.original.campaignId ? `Campaign ID: ${row.original.campaignId}` : null,
        row.original.companyId ? `Company ID: ${row.original.companyId}` : null,
        row.original.contactId ? `Contact ID: ${row.original.contactId}` : null,
      ].filter(Boolean);
      return <StringCell value={entities.join(' | ')} />;
    },
  },
  {
    id: 'opportunityDetails',
    header: 'Opportunity Details',
    cell: ({ row }) => {
      const details = [
        row.original.dealValue ? `Deal Value: ${row.original.dealValue} PHP` : null,
        row.original.probability ? `Probability: ${row.original.probability}%` : null,
        row.original.source ? `Source: ${row.original.source}` : null,
        row.original.stage ? `Stage: ${row.original.stage}` : null,
        row.original.expectedCloseDate ? `Expected Close: ${new Date(row.original.expectedCloseDate).toLocaleDateString()}` : null,
        row.original.lostReason ? `Lost Reason: ${row.original.lostReason}` : null,
      ].filter(Boolean);
      return <StringCell value={details.join(' | ')} />;
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