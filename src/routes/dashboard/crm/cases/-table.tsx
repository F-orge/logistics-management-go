import { getRouteApi } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableColumnHeader } from '@/components/ui/kibo-ui/table';
import type { CrmCasesResponse, CrmContactsRecord } from '@/pocketbase/types';

export const columns: ColumnDef<
  CrmCasesResponse<{
    contact: CrmContactsRecord;
  }>
>[] = [
  {
    accessorKey: 'id',
    header: 'Action',
    cell: ({ row }) => {
      const route = getRouteApi('/dashboard/crm/cases/');

      const navigate = route.useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={'ghost'}>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      editCase: true,
                      id: row.original.id,
                    }),
                  })
                }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      deleteCase: true,
                      id: row.original.id,
                    }),
                  })
                }
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'subject',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Subject" />
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const statusColors = {
        open: 'bg-blue-100 text-blue-800',
        in_progress: 'bg-yellow-100 text-yellow-800',
        pending_customer: 'bg-orange-100 text-orange-800',
        closed: 'bg-green-100 text-green-800',
      };
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
            statusColors[status as keyof typeof statusColors] ||
            'bg-gray-100 text-gray-800'
          }`}
        >
          {status.replace('_', ' ')}
        </span>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = row.getValue('priority') as string;
      if (!priority) return <div>-</div>;

      const priorityColors = {
        low: 'bg-gray-100 text-gray-800',
        medium: 'bg-blue-100 text-blue-800',
        high: 'bg-orange-100 text-orange-800',
        critical: 'bg-red-100 text-red-800',
      };

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
            priorityColors[priority as keyof typeof priorityColors] ||
            'bg-gray-100 text-gray-800'
          }`}
        >
          {priority}
        </span>
      );
    },
  },
  {
    accessorKey: 'contact',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }) => {
      const contact = row.original.expand?.contact;
      if (!contact) return <div>-</div>;
      return (
        <div>
          {contact.first_name} {contact.last_name}
        </div>
      );
    },
  },
  {
    accessorKey: 'created',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const created = row.getValue('created');
      if (!created) return <div>-</div>;
      const date = new Date(created as string);
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: 'closed_at',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Closed At" />
    ),
    cell: ({ row }) => {
      const closedAt = row.getValue('closed_at');
      if (!closedAt) return <div>-</div>;
      const date = new Date(closedAt as string);
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
];
