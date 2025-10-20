import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.wms.shape.tasks>
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
    accessorKey: "taskNumber",
    header: "Task Number",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "pickBatchId",
    header: "Pick Batch ID",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "instructions",
    header: "Instructions",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "sourceEntityId",
    header: "Source Entity ID",
  },
  {
    accessorKey: "sourceEntityType",
    header: "Source Entity Type",
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
    accessorKey: "durationSeconds",
    header: "Duration Seconds",
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
  },
  {
    accessorKey: "endTime",
    header: "End Time",
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
