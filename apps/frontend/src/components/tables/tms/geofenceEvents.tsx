import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.tms.shape.geofenceEvents>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "vehicleId",
    header: "Vehicle ID",
  },
  {
    accessorKey: "geofenceId",
    header: "Geofence ID",
  },
  {
    accessorKey: "eventType",
    header: "Event Type",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
  },
];
