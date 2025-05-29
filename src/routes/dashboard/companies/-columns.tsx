import { DataTableColumnHeader } from '@marahuyo/react-ui/data-table/data-table-column-header';
import { Badge } from '@marahuyo/react-ui/ui/badge';
import { Button } from '@marahuyo/react-ui/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@marahuyo/react-ui/ui/dropdown-menu';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Route } from '.';
import type {
  CompaniesResponse,
  UsersRecord,
} from '../../../../lib/pocketbase.gen';

export const columns: ColumnDef<
  CompaniesResponse<{ primaryContactPerson?: UsersRecord }>
>[] = [
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => {
      const navigate = Route.useNavigate();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <MoreHorizontal className="size-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() =>
                navigate({
                  search: (prev) => ({
                    ...prev,
                    id: row.original.id,
                    editCompany: true,
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
                    id: row.original.id,
                    deleteCompany: true,
                  }),
                })
              }
              variant="destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <Badge variant={'outline'}>{row.original.id}</Badge>,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <h4 className="hover:underline cursor-pointer">{row.original.name}</h4>
    ),
  },
  {
    id: 'address',
    accessorKey: 'address',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => (
      <Badge variant={'outline'}>{row.original.address}</Badge>
    ),
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => <Badge variant={'secondary'}>{row.original.type}</Badge>,
  },
  {
    id: 'contactEmail',
    accessorKey: 'contactEmail',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Email" />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.original.contactEmail}</Badge>
    ),
  },
  {
    id: 'contactPhone',
    accessorKey: 'contactPhone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Phone" />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.original.contactPhone}</Badge>
    ),
  },
  {
    id: 'primaryContactPerson',
    accessorKey: 'expand.primaryContactPerson',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Primary Contact" />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>
        {row.original.expand.primaryContactPerson?.name || 'Not Avaiable'}
      </Badge>
    ),
  },
];
