import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.dms.shape.deliveryRoutes>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "routeDate",
    header: "Route Date",
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
    accessorKey: "driverId",
    header: "Driver ID",
  },
  {
    accessorKey: "actualDurationMinutes",
    header: "Actual Duration Minutes",
  },
  {
    accessorKey: "estimatedDurationMinutes",
    header: "Estimated Duration Minutes",
  },
  {
    accessorKey: "optimizedRouteData",
    header: "Optimized Route Data",
  },
  {
    accessorKey: "totalDistanceKm",
    header: "Total Distance Km",
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
