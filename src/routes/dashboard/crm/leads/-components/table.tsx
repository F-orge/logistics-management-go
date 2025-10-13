import { Link, useRouteContext } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/table';
import NumberCell from '@/components/table/cells/number';
import StringCell from '@/components/table/cells/string';
import type { ORPCOutputs } from '@/orpc/client';
import DateCell from '@/components/table/cells/date';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  paginateOpportunity,
  paginateCampaign,
  paginateCompany,
  paginateContact,
  updateLead,
} from '@/queries/crm';
import RelationCell from '@/components/table/cells/relation';
import { type CrmLeadSource, CrmLeadStatus } from '@/db/types';
import EnumCell from '@/components/table/cells/enum';

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
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/leads/',
      });

      const updateMutation = useMutation(updateLead, queryClient);

      return (
        <StringCell
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { name: value },
            })
          }
          editable
          value={row.original.name}
        />
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/leads/',
      });

      const updateMutation = useMutation(updateLead, queryClient);

      return (
        <StringCell
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { email: value },
            })
          }
          editable
          value={row.original.email}
        />
      );
    },
  },
  {
    accessorKey: 'campaign.name',
    header: 'Campaign',
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/leads/',
      });

      const updateMutation = useMutation(updateLead, queryClient);

      const { data: campaigns } = useQuery(
        {
          ...paginateCampaign({
            page: 1,
            perPage: 100,
          }),
          enabled: !!row.original.campaign,
        },
        queryClient,
      );

      return (
        <RelationCell
          editable
          value={row.original.campaignId}
          options={
            campaigns?.map((row) => ({
              label: row.name,
              value: row.id,
              searchValue: row.name,
            })) || []
          }
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { campaignId: value },
            })
          }
        >
          <Button size={'sm'} variant={'outline'}>
            {row.original.campaign?.name || 'Not Available'}
          </Button>
        </RelationCell>
      );
    },
  },
  {
    accessorKey: 'leadScore',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lead Score" />
    ),
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/leads/',
      });

      const updateMutation = useMutation(updateLead, queryClient);

      return (
        <NumberCell
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { leadScore: value },
            })
          }
          editable
          value={row.original.leadScore}
        />
      );
    },
  },
  {
    accessorKey: 'leadSource',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lead Source" />
    ),
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/leads/',
      });

      const updateMutation = useMutation(updateLead, queryClient);

      return (
        <StringCell
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { leadSource: value as CrmLeadSource },
            })
          }
          editable
          value={row.original.leadSource}
        />
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/leads/',
      });

      const updateMutation = useMutation(updateLead, queryClient);

      return (
        <EnumCell
          editable
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { status: value as CrmLeadStatus },
            })
          }
          value={row.original.status!}
          options={Object.values(CrmLeadStatus).map((obj) => ({
            label: obj,
            value: obj,
          }))}
        >
          <Badge className="w-full justify-start" variant={'secondary'}>
            {row.original.status}
          </Badge>
        </EnumCell>
      );
    },
  },
  {
    accessorKey: 'convertedCompany',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Converted Company" />
    ),
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/leads/',
      });

      const updateMutation = useMutation(updateLead, queryClient);

      const { data: companies } = useQuery(
        {
          ...paginateCompany({
            page: 1,
            perPage: 100,
          }),
        },
        queryClient,
      );

      return (
        <RelationCell
          editable
          value={row.original.convertedCompanyId}
          options={
            companies?.map((row) => ({
              label: row.name,
              value: row.id,
              searchValue: row.name,
            })) || []
          }
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { convertedCompanyId: value },
            })
          }
        >
          <Button size={'sm'} variant={'outline'}>
            {row.original.convertedCompany?.name || 'Not Available'}
          </Button>
        </RelationCell>
      );
    },
  },
  {
    accessorKey: 'convertedContact',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Converted Contact" />
    ),
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/leads/',
      });

      const updateMutation = useMutation(updateLead, queryClient);

      const { data: contacts } = useQuery(
        {
          ...paginateContact({
            page: 1,
            perPage: 100,
          }),
        },
        queryClient,
      );

      return (
        <RelationCell
          editable
          value={row.original.convertedContactId}
          options={
            contacts?.map((row) => ({
              label: row.name,
              value: row.id,
              searchValue: row.name,
            })) || []
          }
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { convertedContactId: value },
            })
          }
        >
          <Button size={'sm'} variant={'outline'}>
            {row.original.convertedContact?.name || 'Not Available'}
          </Button>
        </RelationCell>
      );
    },
  },
  {
    accessorKey: 'convertedOpportunity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Converted Opportunity" />
    ),
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/leads/',
      });

      const updateMutation = useMutation(updateLead, queryClient);

      const { data: opportunities } = useQuery(
        {
          ...paginateOpportunity({
            page: 1,
            perPage: 100,
          }),
        },
        queryClient,
      );

      return (
        <RelationCell
          editable
          value={row.original.convertedOpportunityId}
          options={
            opportunities?.map((row) => ({
              label: row.name,
              value: row.id,
              searchValue: row.name,
            })) || []
          }
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { convertedOpportunityId: value },
            })
          }
        >
          <Button size={'sm'} variant={'outline'}>
            {row.original.convertedOpportunity?.name || 'Not Available'}
          </Button>
        </RelationCell>
      );
    },
  },
  {
    accessorKey: 'ownerId',
    header: 'Owner',
    cell: ({ row }) => {
      const owner = row.original.owner;

      if (!owner) {
        return <div className="text-muted-foreground">N/A</div>;
      }

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage src={owner.image ?? ''} alt={owner.name} />
                <AvatarFallback>
                  {owner.name
                    .split(' ')
                    .filter(
                      (n: any, i: any, arr: any) =>
                        i === 0 || i === arr.length - 1,
                    )
                    .map((n: any) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="truncate">{owner.name}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{owner.email}</p>
          </TooltipContent>
        </Tooltip>
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
