import { ColumnDef } from "@tanstack/react-table";
import { TableBinThresholdQuery } from "@packages/graphql/client/generated/graphql";

// Extract the bin threshold type from the TableBinThresholdQuery
type BinThreshold = NonNullable<TableBinThresholdQuery["wms"]>["binThresholds"][number];

export const columns: ColumnDef<BinThreshold>[] = [
  {
    accessorKey: "product.name",
    header: "Product Name",
  },
  {
    accessorKey: "minQuantity",
    header: "Min Quantity",
  },
  {
    accessorKey: "maxQuantity",
    header: "Max Quantity",
  },
  {
    accessorKey: "reorderQuantity",
    header: "Reorder Quantity",
  },
  {
    accessorKey: "alertThreshold",
    header: "Alert Threshold",
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean | null;
      return isActive ? "Yes" : "No";
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