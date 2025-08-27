import { getRouteApi } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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
import type { CrmProductsResponse } from "@/pocketbase/types";

export const columns: ColumnDef<CrmProductsResponse>[] = [
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const route = getRouteApi("/dashboard/crm/products/");

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
                      editProduct: true,
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
                      deleteProduct: true,
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
    accessorKey: "name",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Product Name" />
    ),
  },
  {
    accessorKey: "sku",
    header: ({ column }) => <TableColumnHeader column={column} title="SKU" />,
    cell: ({ row }) => {
      const sku = row.getValue("sku");
      if (!sku) return <div>-</div>;
      return <div className="font-mono text-sm">{sku as string}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => <TableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => {
      const price = row.getValue("price");
      if (!price) return <div>-</div>;
      return <div>${(price as number).toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const description = row.getValue("description");
      if (!description) return <div>-</div>;
      const text = description as string;
      // Strip HTML tags and truncate
      const plainText = text.replace(/<[^>]*>/g, "");
      const truncated = plainText.length > 100
        ? plainText.substring(0, 100) + "..."
        : plainText;
      return <div className="max-w-xs" title={plainText}>{truncated}</div>;
    },
  },
];
