import { getRouteApi } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableColumnHeader } from "@/components/ui/kibo-ui/table";
import type {
  LmsAddressesResponse,
  LmsWarehousesResponse,
  UsersResponse,
} from "@/pocketbase/types";

// Define the expanded warehouse type
export type WarehouseWithExpands = LmsWarehousesResponse<{
  address?: LmsAddressesResponse;
  manager?: UsersResponse;
}>;

export const columns: ColumnDef<WarehouseWithExpands>[] = [
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const route = getRouteApi("/dashboard/lms/warehouses/");

      const navigate = route.useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"ghost"}>
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
                      editWarehouse: true,
                      id: row.original.id,
                    }),
                  })}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      deleteWarehouse: true,
                      id: row.original.id,
                    }),
                  })}
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
    accessorKey: "code",
    header: ({ column }) => <TableColumnHeader column={column} title="Code" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <TableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <TableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const typeLabels = {
        distribution: "Distribution",
        fulfillment: "Fulfillment",
        cross_dock: "Cross Dock",
        cold_storage: "Cold Storage",
        bonded: "Bonded",
      };
      return (
        <Badge variant="secondary">
          {typeLabels[type as keyof typeof typeLabels] || type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "capacity",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Capacity" />
    ),
    cell: ({ row }) => {
      const capacity = row.getValue("capacity") as number;
      if (!capacity) return <div>-</div>;
      return <div>{capacity.toLocaleString()} units</div>;
    },
  },
  {
    accessorKey: "expand.address",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => {
      const address = row.original.expand?.address;
      if (!address) return <div>-</div>;
      return (
        <div className="max-w-[200px] truncate">
          {address.address_line_1}, {address.city}, {address.state}
        </div>
      );
    },
  },
  {
    accessorKey: "expand.manager",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Manager" />
    ),
    cell: ({ row }) => {
      const manager = row.original.expand?.manager;
      if (!manager) return <div>-</div>;
      return <div>{manager.name || manager.email}</div>;
    },
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => (
      <TableColumnHeader
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue("is_active") as boolean;
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const created = row.getValue("created") as string;
      return <div>{new Date(created).toLocaleDateString()}</div>;
    },
  },
];
