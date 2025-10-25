import { ColumnDef } from "@tanstack/react-table";
import { TableInventoryStockQuery } from "@packages/graphql/client/generated/graphql";

// Extract the inventory stock type from the TableInventoryStockQuery
type InventoryStock = NonNullable<TableInventoryStockQuery["wms"]>["inventoryStocks"][number];

export const columns: ColumnDef<InventoryStock>[] = [
  {
    accessorKey: "product.name",
    header: "Product Name",
  },
  {
    accessorKey: "location.name",
    header: "Location",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "availableQuantity",
    header: "Available Quantity",
  },
  {
    accessorKey: "reservedQuantity",
    header: "Reserved Quantity",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "lastMovementAt",
    header: "Last Movement At",
    cell: ({ row }) => {
      const lastMovementAt = row.getValue("lastMovementAt") as string | null;
      if (!lastMovementAt) return "-";
      return new Date(lastMovementAt).toLocaleDateString();
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string | null;
      if (!createdAt) return "-";
      return new Date(createdAt).toLocaleDateString();
    },
  },
];