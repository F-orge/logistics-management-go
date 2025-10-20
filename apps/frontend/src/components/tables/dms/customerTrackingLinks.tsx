import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.dms.shape.customerTrackingLinks>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "deliveryTaskId",
    header: "Delivery Task ID",
  },
  {
    accessorKey: "trackingToken",
    header: "Tracking Token",
  },
  {
    accessorKey: "expiresAt",
    header: "Expires At",
  },
  {
    accessorKey: "accessCount",
    header: "Access Count",
  },
  {
    accessorKey: "isActive",
    header: "Is Active",
  },
  {
    accessorKey: "lastAccessedAt",
    header: "Last Accessed At",
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
