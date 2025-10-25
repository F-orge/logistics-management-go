import { ColumnDef } from "@tanstack/react-table";
import { TableInventoryAdjustmentQuery } from "@packages/graphql/client/generated/graphql";

// Extract the inventory adjustment type from the TableInventoryAdjustmentQuery
type InventoryAdjustment = NonNullable<TableInventoryAdjustmentQuery["wms"]>["inventoryAdjustments"][number];

export const columns: ColumnDef<InventoryAdjustment>[] = [
  {
    accessorKey: "product.name",
    header: "Product Name",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "quantityChange",
    header: "Quantity Change",
  },
  {
    accessorKey: "user.name",
    header: "Adjusted By",
  },
  {
    accessorKey: "notes",
    header: "Notes",
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