import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.wms.shape.pickBatchItems>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "pickBatchId",
    header: "Pick Batch ID",
  },
  {
    accessorKey: "salesOrderId",
    header: "Sales Order ID",
  },
  {
    accessorKey: "orderPriority",
    header: "Order Priority",
  },
  {
    accessorKey: "estimatedPickTime",
    header: "Estimated Pick Time",
  },
  {
    accessorKey: "actualPickTime",
    header: "Actual Pick Time",
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
