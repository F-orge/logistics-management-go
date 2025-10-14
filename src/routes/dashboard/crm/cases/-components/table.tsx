import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useRouteContext } from '@tanstack/react-router';
import type { Column, ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/table';
import DateCell from '@/components/table/cells/date';
import EnumCell from '@/components/table/cells/enum';
import RelationCell from '@/components/table/cells/relation';
import StringCell from '@/components/table/cells/string';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CrmCasePriority, CrmCaseStatus, CrmCaseType } from '@/db/types';
import type { ORPCOutputs } from '@/orpc/client';
import { paginateContact, updateCase } from '@/queries/crm';

type Case = ORPCOutputs['crm']['paginateCase'][number] & {
  contact?: ORPCOutputs['crm']['inContact'][number];
  owner: {
    name: string;
    image?: string | null;
    email: string;
    id: string;
  };
};

export const columns: ColumnDef<Case>[] = [
  {
    accessorKey: 'caseNumber',
    header: ({ column }: { column: Column<Case> }) => (
      <DataTableColumnHeader column={column} title="Case Number" />
    ),
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/cases/',
      });

      const updateMutation = useMutation(updateCase, queryClient);

      return (
        <StringCell
          editable
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { caseNumber: value },
            })
          }
          value={row.original.caseNumber}
        />
      );
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }: { column: Column<Case> }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/cases/',
      });

      const updateMutation = useMutation(updateCase, queryClient);

      return (
        <StringCell
          editable
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { description: value },
            })
          }
          value={row.original.description}
        />
      );
    },
  },
  {
    accessorKey: 'contact.name',
    header: ({ column }: { column: Column<Case> }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }) => {
      const contact = row.original.contact;

      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/cases/',
      });

      const updateMutation = useMutation(updateCase, queryClient);

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
          value={contact?.id}
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
              value: { contactId: value },
            })
          }
        >
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarFallback>
                {contact?.name
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
            <Link
              to="/dashboard/crm/contacts"
              search={{
                view: true,
                id: contact?.id,
                filters: [
                  {
                    column: 'id',
                    operation: '=',
                    value: contact?.id,
                  },
                ],
              }}
              className="hover:underline"
            >
              {contact?.name}
            </Link>
          </div>
        </RelationCell>
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
        from: '/dashboard/crm/cases/',
      });

      const updateMutation = useMutation(updateCase, queryClient);

      return (
        <EnumCell
          editable
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { status: value as CrmCaseStatus },
            })
          }
          value={row.original.status!}
          options={Object.values(CrmCaseStatus).map((obj) => ({
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
    accessorKey: 'priority',
    header: ({ column }: { column: Column<Case> }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/cases/',
      });

      const updateMutation = useMutation(updateCase, queryClient);

      return (
        <EnumCell
          editable
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { priority: value as CrmCasePriority },
            })
          }
          value={row.original.priority!}
          options={Object.values(CrmCasePriority).map((obj) => ({
            label: obj,
            value: obj,
          }))}
        >
          <Badge className="w-full justify-start" variant={'secondary'}>
            {row.original.priority}
          </Badge>
        </EnumCell>
      );
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }: { column: Column<Case> }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/cases/',
      });

      const updateMutation = useMutation(updateCase, queryClient);

      return (
        <EnumCell
          editable
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { type: value as CrmCaseType },
            })
          }
          value={row.original.type!}
          options={Object.values(CrmCaseType).map((obj) => ({
            label: obj,
            value: obj,
          }))}
        >
          <Badge className="w-full justify-start" variant={'secondary'}>
            {row.original.type}
          </Badge>
        </EnumCell>
      );
    },
  },
  {
    accessorKey: 'owner.name',
    header: ({ column }: { column: Column<Case> }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
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
