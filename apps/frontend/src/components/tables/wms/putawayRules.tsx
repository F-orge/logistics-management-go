import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.wms.shape.putawayRules>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "productId",
    header: "Product ID",
  },
  {
    accessorKey: "warehouseId",
    header: "Warehouse ID",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "clientId",
    header: "Client ID",
  },
  {
    accessorKey: "isActive",
    header: "Is Active",
  },
  {
    accessorKey: "locationType",
    header: "Location Type",
  },
  {
    accessorKey: "maxQuantity",
    header: "Max Quantity",
  },
  {
    accessorKey: "minQuantity",
    header: "Min Quantity",
  },
  {
    accessorKey: "preferredLocationId",
    header: "Preferred Location ID",
  },
  {
    accessorKey: "requiresHazmatApproval",
    header: "Requires Hazmat Approval",
  },
  {
    accessorKey: "requiresTemperatureControl",
    header: "Requires Temperature Control",
  },
  {
    accessorKey: "volumeThreshold",
    header: "Volume Threshold",
  },
  {
    accessorKey: "weightThreshold",
    header: "Weight Threshold",
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
