import { TransportManagementGeofenceResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type GeofenceResponse = TransportManagementGeofenceResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Geofence Name",
  },
  {
    accessorKey: "coordinates",
    header: "Coordinates",
    cell: ({ row }) => {
      const coords = row.getValue("coordinates") as { lon: number; lat: number } | undefined;
      return coords
        ? `${coords.lat.toFixed(6)}, ${coords.lon.toFixed(6)}`
        : "-";
    },
  },
  {
    accessorKey: "radius",
    header: "Radius (m)",
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
] satisfies ColumnDef<GeofenceResponse>[];
