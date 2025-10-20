import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.wms.shape.pickBatches>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "warehouseId",
    header: "Warehouse ID",
  },
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "strategy",
    header: "Strategy",
  },
  {
    accessorKey: "assignedUserId",
    header: "Assigned User ID",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "totalItems",
    header: "Total Items",
  },
  {
    accessorKey: "completedItems",
    header: "Completed Items",
  },
  {
    accessorKey: "estimatedDuration",
    header: "Estimated Duration",
  },
  {
    accessorKey: "actualDuration",
    header: "Actual Duration",
  },
  {
    accessorKey: "startedAt",
    header: "Started At",
  },
  {
    accessorKey: "completedAt",
    header: "Completed At",
  },
  {
    accessorKey: "waveId",
    header: "Wave ID",
  },
  {
    accessorKey: "zoneRestrictions",
    header: "Zone Restrictions",
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
