import { Link } from '@tanstack/react-router';
import { ColumnDef, type Column } from '@tanstack/react-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/table';
import StringCell from '@/components/table/cells/string';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ORPCOutputs } from '@/orpc/client';
import type { VariantProps } from 'class-variance-authority';

type Case = ORPCOutputs['crm']['paginateCase'][number] & {
  contact: ORPCOutputs['crm']['inContact'][number] | undefined;
  owner: {
    name: string;
    image: string;
    email: string;
    id: string;
  };
};

const priorityVariantMap: Record<
  string,
  VariantProps<typeof badgeVariants>['variant']
> = {
  low: 'secondary',
  medium: 'outline',
  high: 'destructive',
};

const statusVariantMap: Record<
  string,
  VariantProps<typeof badgeVariants>['variant']
> = {
  open: 'secondary',
  'in-progress': 'outline',
  closed: 'default',
};

export const columns: ColumnDef<Case>[] = [
  {
    accessorKey: 'caseNumber',
    header: ({ column }: { column: Column<Case> }) => (
      <DataTableColumnHeader column={column} title="Case Number" />
    ),
    cell: ({ row }: { row: any }) => (
      <StringCell value={row.original.caseNumber} />
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }: { column: Column<Case> }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }: { row: any }) => (
      <StringCell value={row.original.description} />
    ),
  },
  {
    accessorKey: 'contact.name',
    header: ({ column }: { column: Column<Case> }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }: { row: any }) => {
      const contact = row.original.contact;
      if (!contact) {
        return <div className="text-muted-foreground">N/A</div>;
      }
      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarFallback>
              {contact.name
                .split(' ')
                .filter(
                  (n: any, i: any, arr: any) => i === 0 || i === arr.length - 1,
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
              id: contact.id,
              filters: [
                {
                  column: 'id',
                  operation: '=',
                  value: contact.id,
                },
              ],
            }}
            className="hover:underline"
          >
            {contact.name}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }: { column: Column<Case> }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }: { row: any }) => {
      const status = row.original.status?.toLowerCase() || '';
      return (
        <Badge variant={statusVariantMap[status] ?? 'default'}>
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }: { column: Column<Case> }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }: { row: any }) => {
      const priority = row.original.priority?.toLowerCase() || '';
      return (
        <Badge variant={priorityVariantMap[priority] ?? 'default'}>
          {row.original.priority}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }: { column: Column<Case> }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }: { row: any }) => (
      <Badge variant="outline">{row.original.type}</Badge>
    ),
  },
  {
    accessorKey: 'owner.name',
    header: ({ column }: { column: Column<Case> }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
    cell: ({ row }: { row: any }) => {
      const owner = row.original.owner;
      if (!owner) {
        return <div className="text-muted-foreground">N/A</div>;
      }
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage src={owner.image} alt={owner.name} />
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
    header: ({ column }: { column: Column<Case> }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }: { row: any }) => (
      <div className="whitespace-nowrap">
        {new Date(row.original.createdAt).toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }: { column: Column<Case> }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }: { row: any }) => (
      <div className="whitespace-nowrap">
        {new Date(row.original.updatedAt).toLocaleString()}
      </div>
    ),
  },
];
