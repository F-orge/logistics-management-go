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
import { format } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import type { RecordOptions } from 'pocketbase';
import { Route } from '..';
import type { ExpandedRoutesResponse } from '../-schemas/routes';

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
                    edit: true,
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
                    delete: true,
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
    cell: ({ row }) => <Badge variant={'outline'}>{row.original.id}</Badge>,
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
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.original.routeName}</Badge>
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
    cell: ({ row }) => (
      <Badge variant={'secondary'}>
        {row.original.expand.vehicleAssigned?.licensePlate || 'Not Available'}
      </Badge>
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
    cell: ({ row }) => (
      <Badge variant={'secondary'}>
        {row.original.expand.driverAssigned?.name || 'Not Available'}
      </Badge>
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
    cell: ({ row }) => (
      <Badge variant={'secondary'}>
        {row.original.plannedStartTime
          ? format(row.original.plannedStartTime, 'MM/dd/yyyy hh:mm aa')
          : 'Not Available'}
      </Badge>
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
    cell: ({ row }) => (
      <Badge variant={'secondary'}>
        {row.original.plannedEndTime
          ? format(row.original.plannedEndTime, 'MM/dd/yyyy hh:mm aa')
          : 'Not Available'}
      </Badge>
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
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.original.status}</Badge>
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
];

export const options: RecordOptions = {
  expand: 'vehicleAssigned,driverAssigned,shipmentsOnRoute',
};
