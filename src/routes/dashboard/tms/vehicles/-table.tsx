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
import type { TmsVehiclesResponse } from '@/pocketbase/types';

export const columns: ColumnDef<TmsVehiclesResponse>[] = [
  {
    accessorKey: 'id',
    header: 'Action',
    cell: ({ row }) => {
      const route = getRouteApi('/dashboard/tms/vehicles/');
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
                      editVehicle: true,
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
                      deleteVehicle: true,
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
    accessorKey: 'vehicle_number',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Vehicle Number" />
    ),
  },
  {
    accessorKey: 'license_plate',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="License Plate" />
    ),
  },
  {
    accessorKey: 'vehicle_type',
    header: ({ column }) => <TableColumnHeader column={column} title="Type" />,
  },
  {
    accessorKey: 'make',
    header: ({ column }) => <TableColumnHeader column={column} title="Make" />,
  },
  {
    accessorKey: 'model',
    header: ({ column }) => <TableColumnHeader column={column} title="Model" />,
  },
  {
    accessorKey: 'year',
    header: ({ column }) => <TableColumnHeader column={column} title="Year" />,
    cell: ({ row }) => {
      const year = new Date(row.getValue('year')).getFullYear();
      return <span>{year}</span>;
    },
  },
  {
    accessorKey: 'capacity_weight',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Weight Capacity" />
    ),
    cell: ({ row }) => {
      const weight = row.getValue('capacity_weight') as number;
      return weight ? <span>{weight} kg</span> : <span>—</span>;
    },
  },
  {
    accessorKey: 'capacity_volume',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Volume Capacity" />
    ),
    cell: ({ row }) => {
      const volume = row.getValue('capacity_volume') as number;
      return volume ? <span>{volume} m³</span> : <span>—</span>;
    },
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
        maintenance: 'bg-yellow-100 text-yellow-800',
        retired: 'bg-gray-100 text-gray-800',
        'out-of-service': 'bg-red-100 text-red-800',
      };

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            statusColors[status as keyof typeof statusColors] ||
            'bg-gray-100 text-gray-800'
          }`}
        >
          {status}
        </span>
      );
    },
  },
];
