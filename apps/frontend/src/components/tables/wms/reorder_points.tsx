import { ColumnDef } from "@tanstack/react-table";
import { TableReorderPointQuery } from "@packages/graphql/client/generated/graphql";

// Extract the reorder point type from the TableReorderPointQuery
type ReorderPoint = NonNullable<TableReorderPointQuery["wms"]>["reorderPoints"][number];

export const columns: ColumnDef<ReorderPoint>[] = [
  {
    accessorKey: "product.name",
    header: "Product Name",
  },
  {
    accessorKey: "warehouse.name",
    header: "Warehouse",
  },
  {
    accessorKey: "threshold",
    header: "Threshold",
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