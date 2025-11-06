import { TransportManagementRoutesResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type RouteResponse = TransportManagementRoutesResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Route Name",
  },
  {
    accessorKey: "totalDistance",
    header: "Total Distance (km)",
  },
  {
    accessorKey: "totalDuration",
    header: "Total Duration (min)",
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("created") as string;
      return new Date(date).toLocaleDateString();
    },
  },
  {
    accessorKey: "updated",
    header: "Updated",
    cell: ({ row }) => {
      const date = row.getValue("updated") as string;
      return new Date(date).toLocaleDateString();
    },
  },
] satisfies ColumnDef<RouteResponse>[];
