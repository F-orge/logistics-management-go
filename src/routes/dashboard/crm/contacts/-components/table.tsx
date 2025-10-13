import { Link, useRouteContext } from '@tanstack/react-router';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/table';
import StringCell from '@/components/table/cells/string';
import { ORPCOutputs } from '@/orpc/client';
import DateCell from '@/components/table/cells/date';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useMutation, useQuery } from '@tanstack/react-query';
import { paginateCompany, updateCompany, updateContact } from '@/queries/crm';
import RelationCell from '@/components/table/cells/relation';

export const columns: ColumnDef<
  ORPCOutputs['crm']['paginateContact'][number] & {
    company?: ORPCOutputs['crm']['inCompany'][number];
    owner?: {
      name: string;
      image?: string | null;
      email: string;
      id: string;
    };
  }
>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Name" />
    ),
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/contacts/',
      });

      const updateMutation = useMutation(updateContact, queryClient);

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
        from: '/dashboard/crm/contacts/',
      });

      const updateMutation = useMutation(updateContact, queryClient);

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
    accessorKey: 'phoneNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/contacts/',
      });

      const updateMutation = useMutation(updateContact, queryClient);

      return (
        <StringCell
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { phoneNumber: value },
            })
          }
          editable
          value={row.original.phoneNumber}
        />
      );
    },
  },
  {
    accessorKey: 'company',
    header: 'Company',
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/contacts/',
      });

      const updateMutation = useMutation(updateContact, queryClient);

      const { data: companies } = useQuery(
        {
          ...paginateCompany({
            page: 1,
            perPage: 100,
          }),
          enabled: !!row.original.company,
        },
        queryClient,
      );

      return (
        <RelationCell
          editable
          value={row.original.companyId}
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
              value: { companyId: value },
            })
          }
        >
          <Button size={'sm'} variant={'outline'}>
            {row.original.company?.name || 'Not Avaiable'}
          </Button>
        </RelationCell>
      );
    },
  },
  {
    accessorKey: 'jobTitle',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Title" />
    ),
    cell: ({ row }) => {
      const { queryClient } = useRouteContext({
        from: '/dashboard/crm/contacts/',
      });

      const updateMutation = useMutation(updateContact, queryClient);

      return (
        <StringCell
          onSave={async (value) =>
            updateMutation.mutateAsync({
              id: row.original.id,
              value: { jobTitle: value },
            })
          }
          editable
          value={row.original.jobTitle}
        />
      );
    },
  },
  {
    accessorKey: 'owner.name',
    header: ({ column }) => (
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
