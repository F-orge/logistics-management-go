import { Link } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/table';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import { ORPCOutputs } from '@/orpc/client';
import DateCell from '@/components/table/cells/date';

export const columns: ColumnDef<
  ORPCOutputs['crm']['paginateLead'][number] & {
    campaign?: ORPCOutputs['crm']['inCampaign'][number];
    convertedCompany?: ORPCOutputs['crm']['inCompany'][number];
    convertedContact?: ORPCOutputs['crm']['inContact'][number];
    convertedOpportunity?: ORPCOutputs['crm']['inOpportunity'][number];
    owner?: ORPCOutputs['auth']['inUser'][number];
  }
>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lead Name" />
    ),
    cell: ({ row }) => {
      return <StringCell value={row.original.name} />;
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
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
              {row.original.campaign?.name}
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lead Score" />
    ),
    cell: ({ row }) => <NumberCell value={row.original.leadScore} />,
  },
  {
    accessorKey: 'leadSource',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lead Source" />
    ),
    cell: ({ row }) => <StringCell value={row.original.leadSource} />,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <Badge variant="outline">{row.original.status}</Badge>,
  },
  {
    accessorKey: 'ownerId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner ID" />
    ),
    cell: ({ row }) => <StringCell value={row.original.owner?.name} />,
  },
  {
    id: 'conversionInfo',
    header: 'Conversion Info',
    cell: ({ row }) => {
      const convertedAt = row.original.convertedAt ? (
        <StringCell
          value={`Converted: ${new Date(
            row.original.convertedAt,
          ).toLocaleString()}`}
        />
      ) : null;

      const companyLink = row.original.convertedCompany ? (
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
            {`Company: ${row.original.convertedCompany?.name}`}
          </Link>
        </Button>
      ) : null;

      const contactLink = row.original.convertedContact ? (
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
            {`Contact: ${row.original.convertedContact?.name}`}
          </Link>
        </Button>
      ) : null;

      const opportunityLink = row.original.convertedOpportunity ? (
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
            {`Opportunity: ${row.original.convertedOpportunity?.name}`}
          </Link>
        </Button>
      ) : null;

      return (
        <div className="flex flex-col gap-2">
          {convertedAt}
          {companyLink}
          {contactLink}
          {opportunityLink}
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => <DateCell value={row.original.createdAt} />,
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => <DateCell value={row.original.updatedAt} />,
  },
];
