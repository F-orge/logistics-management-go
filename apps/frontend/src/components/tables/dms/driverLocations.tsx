import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.dms.shape.driverLocations>
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
    accessorKey: "latitude",
    header: "Latitude",
  },
  {
    accessorKey: "longitude",
    header: "Longitude",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
  },
  {
    accessorKey: "accuracy",
    header: "Accuracy",
  },
  {
    accessorKey: "altitude",
    header: "Altitude",
  },
  {
    accessorKey: "heading",
    header: "Heading",
  },
  {
    accessorKey: "speedKmh",
    header: "Speed Kmh",
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
