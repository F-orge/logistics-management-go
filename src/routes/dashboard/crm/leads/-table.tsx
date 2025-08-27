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
import type { CrmLeadsResponse } from '@/pocketbase/types';

export const columns: ColumnDef<CrmLeadsResponse>[] = [
  {
    accessorKey: 'id',
    header: 'Action',
    cell: ({ row }) => {
      const route = getRouteApi('/dashboard/crm/leads/');

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
                      editLead: true,
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
                      deleteLead: true,
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
    accessorKey: 'company_name',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Company Name" />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: 'first_name',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="First Name" />
    ),
  },
  {
    accessorKey: 'last_name',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: 'lead_score',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Lead Score" />
    ),
  },
  {
    accessorKey: 'lead_status',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Lead Status" />
    ),
  },
  {
    accessorKey: 'lead_source',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Lead Source" />
    ),
  },
  {
    accessorKey: 'phone_number',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Phone Number" />
    ),
  },
];
