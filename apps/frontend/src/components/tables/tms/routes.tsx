import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.tms.shape.routes>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "tripId",
    header: "Trip ID",
  },
  {
    accessorKey: "optimizedRouteData",
    header: "Optimized Route Data",
  },
  {
    accessorKey: "totalDistance",
    header: "Total Distance",
  },
  {
    accessorKey: "totalDuration",
    header: "Total Duration",
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
