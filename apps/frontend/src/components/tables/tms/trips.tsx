import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.tms.shape.trips>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "driverId",
    header: "Driver ID",
  },
  {
    accessorKey: "vehicleId",
    header: "Vehicle ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "endLocation",
    header: "End Location",
  },
  {
    accessorKey: "endTime",
    header: "End Time",
  },
  {
    accessorKey: "startLocation",
    header: "Start Location",
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
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
