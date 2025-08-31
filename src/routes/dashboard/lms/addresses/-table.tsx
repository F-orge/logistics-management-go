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
import type { LmsAddressesResponse } from '@/pocketbase/types';

export const columns: ColumnDef<LmsAddressesResponse>[] = [
  {
    accessorKey: 'id',
    header: 'Action',
    cell: ({ row }) => {
      const route = getRouteApi('/dashboard/lms/addresses/');
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
                      editAddress: true,
                      id: row.original.id,
                    }),
                  })
                }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      deleteAddress: true,
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
    accessorKey: 'address_line_1',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Address Line 1" />
    ),
  },
  {
    accessorKey: 'address_line_2',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Address Line 2" />
    ),
  },
  {
    accessorKey: 'city',
    header: ({ column }) => <TableColumnHeader column={column} title="City" />,
  },
  {
    accessorKey: 'state',
    header: ({ column }) => <TableColumnHeader column={column} title="State" />,
  },
  {
    accessorKey: 'postal_code',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Postal Code" />
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <TableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      return <span className="capitalize text-sm">{type || 'N/A'}</span>;
    },
  },
  {
    accessorKey: 'is_validated',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Validated" />
    ),
    cell: ({ row }) => {
      const isValidated = row.getValue('is_validated') as boolean;
      return (
        <span
          className={`text-sm ${
            isValidated ? 'text-green-600' : 'text-orange-600'
          }`}
        >
          {isValidated ? 'Yes' : 'No'}
        </span>
      );
    },
  },
  {
    accessorKey: 'created',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('created'));
      return date.toLocaleDateString();
    },
  },
];
