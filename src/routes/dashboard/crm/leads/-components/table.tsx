import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import DateCell from '@/components/table/cells/date';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { Button } from '@/components/ui/button';
import { ORPCOutputs, orpcClient } from '@/orpc/client';
import { CrmCampaign } from '@/schemas/crm/campaigns';
import { CrmCompany } from '@/schemas/crm/companies';
import { CrmContact } from '@/schemas/crm/contacts';
import { CrmOpportunity } from '@/schemas/crm/opportunities';

export const columns: ColumnDef<
  ORPCOutputs['crm']['paginateLead'][number] & {
    campaign?: ORPCOutputs['crm']['inCampaign'][number];
    convertedCompany?: ORPCOutputs['crm']['inCompany'][number];
    convertedContact?: ORPCOutputs['crm']['inContact'][number];
    convertedOpportunity?: ORPCOutputs['crm']['inOpportunity'][number];
  }
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
    accessorKey: 'campaign.name',
    header: 'Campaign',
    cell: ({ row }) => (
      <>
        {row.original.campaign ? (
          <Button size={'sm'} variant={'outline'} className="w-full" asChild>
            <Link
              to="/dashboard/crm/campaigns"
              search={{
                view: true,
                id: row.original.campaign.id,
                filters: [
                  {
                    column: 'id',
                    operation: '=',
                    value: row.original.campaign.id,
                  },
                ],
              }}
            >
              <StringCell value={row.original.campaign?.name} />
            </Link>
          </Button>
        ) : (
          <StringCell value={'Not Available'} />
        )}
      </>
    ),
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
        row.original.convertedAt
          ? `Converted: ${new Date(row.original.convertedAt).toLocaleString()}`
          : null,
        row.original.convertedCompany ? (
          <Button size={'sm'} variant={'outline'} className="w-full" asChild>
            <Link
              to="/dashboard/crm/companies"
              search={{
                view: true,
                id: row.original.convertedCompany.id,
                filters: [
                  {
                    column: 'id',
                    operation: '=',
                    value: row.original.convertedCompany.id,
                  },
                ],
              }}
            >
              <StringCell
                value={`Company: ${row.original.convertedCompany?.name}`}
              />
            </Link>
          </Button>
        ) : null,
        row.original.convertedContact ? (
          <Button size={'sm'} variant={'outline'} className="w-full" asChild>
            <Link
              to="/dashboard/crm/contacts"
              search={{
                view: true,
                id: row.original.convertedContact.id,
                filters: [
                  {
                    column: 'id',
                    operation: '=',
                    value: row.original.convertedContact.id,
                  },
                ],
              }}
            >
              <StringCell
                value={`Contact: ${row.original.convertedContact?.name}`}
              />
            </Link>
          </Button>
        ) : null,
        row.original.convertedOpportunity ? (
          <Button size={'sm'} variant={'outline'} className="w-full" asChild>
            <Link
              to="/dashboard/crm/opportunities"
              search={{
                view: true,
                id: row.original.convertedOpportunity.id,
                filters: [
                  {
                    column: 'id',
                    operation: '=',
                    value: row.original.convertedOpportunity.id,
                  },
                ],
              }}
            >
              <StringCell
                value={`Opportunity: ${row.original.convertedOpportunity?.name}`}
              />
            </Link>
          </Button>
        ) : null,
      ].filter(Boolean);
      return <div className="flex flex-col gap-2">{conversionParts}</div>;
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
