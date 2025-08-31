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
import type { TmsDriversResponse } from '@/pocketbase/types';

export const columns: ColumnDef<TmsDriversResponse>[] = [
  {
    accessorKey: 'id',
    header: 'Action',
    cell: ({ row }) => {
      const route = getRouteApi('/dashboard/tms/drivers/');
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
                      editDriver: true,
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
                      deleteDriver: true,
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
    accessorKey: 'employee_id',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Employee ID" />
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
    accessorKey: 'hire_date',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Hire Date" />
    ),
  },
  {
    accessorKey: 'license_number',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="License Number" />
    ),
  },
  {
    accessorKey: 'phone_number',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Phone Number" />
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
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-gray-100 text-gray-800',
        on_leave: 'bg-yellow-100 text-yellow-800',
        terminated: 'bg-red-100 text-red-800',
      };

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            statusColors[status as keyof typeof statusColors] ||
            'bg-gray-100 text-gray-800'
          }`}
        >
          {status.replace('_', ' ')}
        </span>
      );
    },
  },
];
