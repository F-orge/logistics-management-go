import { getRouteApi } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
import type {
  LmsPackagesResponse,
  LmsShipmentsResponse,
} from '@/pocketbase/types';

// Define the expanded package type
export type PackageWithExpands = LmsPackagesResponse<{
  shipment?: LmsShipmentsResponse;
}>;

export const columns: ColumnDef<PackageWithExpands>[] = [
  {
    accessorKey: 'id',
    header: 'Action',
    cell: ({ row }) => {
      const route = getRouteApi('/dashboard/lms/packages/');

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
                      editPackage: true,
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
                      deletePackage: true,
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
    accessorKey: 'package_number',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Package Number" />
    ),
  },
  {
    accessorKey: 'expand.shipment',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Shipment" />
    ),
    cell: ({ row }) => {
      const shipment = row.original.expand?.shipment;
      if (!shipment) return <div>-</div>;
      return (
        <div className="max-w-[150px] truncate">
          {shipment.tracking_number || shipment.id}
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <TableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      const typeLabels = {
        box: 'Box',
        envelope: 'Envelope',
        tube: 'Tube',
        pallet: 'Pallet',
        crate: 'Crate',
        bag: 'Bag',
      };
      return (
        <Badge variant="secondary">
          {typeLabels[type as keyof typeof typeLabels] || type}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'weight',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Weight" />
    ),
    cell: ({ row }) => {
      const weight = row.getValue('weight') as number;
      if (!weight) return <div>-</div>;
      return <div>{weight} kg</div>;
    },
  },
  {
    accessorKey: 'dimensions',
    header: 'Dimensions (L×H)',
    cell: ({ row }) => {
      const length = row.original.length;
      const height = row.original.height;

      if (!length && !height) return <div>-</div>;

      const dimensions = [];
      if (length) dimensions.push(`${length}cm`);
      if (height) dimensions.push(`${height}cm`);

      return <div>{dimensions.join(' × ') || '-'}</div>;
    },
  },
  {
    accessorKey: 'declared_value',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Declared Value" />
    ),
    cell: ({ row }) => {
      const value = row.getValue('declared_value') as number;
      if (!value) return <div>-</div>;
      return <div>${value.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const description = row.getValue('description') as string;
      if (!description) return <div>-</div>;
      // Strip HTML tags for display
      const textContent = description.replace(/<[^>]*>/g, '');
      return (
        <div className="max-w-[200px] truncate" title={textContent}>
          {textContent}
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
      const created = row.getValue('created') as string;
      return <div>{new Date(created).toLocaleDateString()}</div>;
    },
  },
];
