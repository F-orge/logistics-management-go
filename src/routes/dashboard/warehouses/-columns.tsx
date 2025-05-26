import type { ColumnDef } from '@tanstack/react-table';
import type {
  UsersRecord,
  WarehousesResponse,
} from '../../../../lib/pocketbase.gen';
import { DataTableColumnHeader } from '@marahuyo/react-ui/data-table/data-table-column-header';
import { Badge } from '@marahuyo/react-ui/ui/badge';
import { useNavigate } from '@tanstack/react-router';
import { Route } from '.';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@marahuyo/react-ui/ui/dropdown-menu';
import { Button } from '@marahuyo/react-ui/ui/button';
import { MoreHorizontal } from 'lucide-react';

export type ExpandedWarehouseResponse = WarehousesResponse<{
  manager: UsersRecord;
}>;

export const columns: ColumnDef<ExpandedWarehouseResponse>[] = [
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => {
      const navigate = useNavigate({ from: Route.fullPath });
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
                    editWarehouse: true,
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
                    deleteWarehouse: true,
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
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="ID"
      />
    ),
    cell: ({ row }) => <Badge variant={'secondary'}>{row.original.id}</Badge>,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Name"
      />
    ),
  },
  {
    id: 'address',
    accessorKey: 'address',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Address"
      />
    ),
  },
  {
    id: 'longitude',
    accessorKey: 'longitude',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Longitude"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.original.longitude}</Badge>
    ),
  },
  {
    id: 'latitude',
    accessorKey: 'latitude',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Latitude"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.original.latitude}</Badge>
    ),
  },
  {
    id: 'manager',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Manager"
      />
    ),
    accessorFn: (row) => row.expand.manager.name,
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.original.expand.manager.name}</Badge>
    ),
  },
];
