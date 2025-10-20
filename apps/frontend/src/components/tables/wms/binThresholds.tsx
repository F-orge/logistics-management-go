import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.wms.shape.binThresholds>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "locationId",
    header: "Location ID",
  },
  {
    accessorKey: "productId",
    header: "Product ID",
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
    accessorKey: "alertThreshold",
    header: "Alert Threshold",
  },
  {
    accessorKey: "reorderQuantity",
    header: "Reorder Quantity",
  },
  {
    accessorKey: "isActive",
    header: "Is Active",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
