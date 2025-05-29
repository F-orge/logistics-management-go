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
import type { ExpandedVehiclesResponse } from '../-schemas/vehicles';

export const columns: ColumnDef<ExpandedVehiclesResponse>[] = [
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
    id: 'licensePlate',
    accessorKey: 'licensePlate',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="License Plate"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>{row.original.licensePlate}</Badge>
    ),
  },
  {
    id: 'make',
    accessorKey: 'make',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Vehicle Manufacturer"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>
        {row.original.make || 'Not Available'}
      </Badge>
    ),
  },
  {
    id: 'model',
    accessorKey: 'model',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Model"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>
        {row.original.model || 'Not Available'}
      </Badge>
    ),
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Type"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>
        {row.original.type || 'Not Available'}
      </Badge>
    ),
  },
  {
    id: 'capacityVolume',
    accessorKey: 'capacityVolume',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Capacity Volume"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>
        {`${row.original.capacityVolume} liters` || 'Not Available'}
      </Badge>
    ),
  },
  {
    id: 'capacityWeight',
    accessorKey: 'capacityWeight',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Capacity Weight"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>
        {`${row.original.capacityWeight} kg` || 'Not Available'}
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
      <Badge variant={'secondary'}>
        {row.original.status || 'Not Available'}
      </Badge>
    ),
  },
  {
    id: 'currentDriver',
    accessorKey: 'currentDriver',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full justify-between"
        column={column}
        title="Current Driver"
      />
    ),
    cell: ({ row }) => (
      <Badge variant={'secondary'}>
        {row.original.expand.currentDriver?.name || 'Not Available'}
      </Badge>
    ),
  },
];

export const options: RecordOptions = {
  expand: 'currentDriver',
};
