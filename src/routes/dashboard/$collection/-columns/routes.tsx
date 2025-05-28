import type { ColumnDef } from '@tanstack/react-table';
import type { ExpandedRoutesResponse } from '../-schemas/routes';
import { DataTableColumnHeader } from '@marahuyo/react-ui/data-table/data-table-column-header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@marahuyo/react-ui/ui/dropdown-menu';
import { Button } from '@marahuyo/react-ui/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Route } from '..';
import EditRouteForm from '../-actions/routes/edit';

export const columns: ColumnDef<ExpandedRoutesResponse>[] = [
  {
    id: 'Actions',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Actions"
      />
    ),
    cell: ({ row }) => {
      const navigate = Route.useNavigate();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
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
                    editRoute: true,
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
                    deleteRoute: true,
                    id: row.original.id,
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
  },
  {
    id: 'routeName',
    accessorKey: 'routeName',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Route Name"
      />
    ),
  },
  {
    id: 'vehicleAssigned',
    accessorKey: 'vehicleAssigned',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Vehicle Assigned"
      />
    ),
  },
  {
    id: 'driverAssigned',
    accessorKey: 'driverAssigned',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Driver Assigned"
      />
    ),
  },
  {
    id: 'plannedStartTime',
    accessorKey: 'plannedStartTime',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Planned Start Time"
      />
    ),
  },
  {
    id: 'plannedEndTime',
    accessorKey: 'plannedEndTime',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Planned End time"
      />
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Status"
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
  },
  {
    id: 'shipmentsOnRoute',
    accessorKey: 'shipmentsOnRoute',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Shipment On Route"
      />
    ),
  },
];
