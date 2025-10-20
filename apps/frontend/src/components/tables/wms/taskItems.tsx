import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.wms.shape.taskItems>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "taskId",
    header: "Task ID",
  },
  {
    accessorKey: "productId",
    header: "Product ID",
  },
  {
    accessorKey: "quantityRequired",
    header: "Quantity Required",
  },
  {
    accessorKey: "quantityCompleted",
    header: "Quantity Completed",
  },
  {
    accessorKey: "quantityRemaining",
    header: "Quantity Remaining",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "batchId",
    header: "Batch ID",
  },
  {
    accessorKey: "completedAt",
    header: "Completed At",
  },
  {
    accessorKey: "destinationLocationId",
    header: "Destination Location ID",
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
  },
  {
    accessorKey: "lotNumber",
    header: "Lot Number",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "serialNumbers",
    header: "Serial Numbers",
  },
  {
    accessorKey: "sourceLocationId",
    header: "Source Location ID",
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
