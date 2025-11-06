import { TransportManagementGpsPingsResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type GpsPingResponse = TransportManagementGpsPingsResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "vehicle",
    header: "Vehicle ID",
  },
  {
    accessorKey: "coordinates",
    header: "Location",
    cell: ({ row }) => {
      const coords = row.getValue("coordinates") as { lon: number; lat: number } | undefined;
      return coords
        ? `${coords.lat.toFixed(6)}, ${coords.lon.toFixed(6)}`
        : "-";
    },
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
      const date = row.getValue("timestamp") as string;
      return new Date(date).toLocaleString();
    },
  },
] satisfies ColumnDef<GpsPingResponse>[];
