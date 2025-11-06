import { DeliveryManagementDriverLocationResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type DriverLocationResponse = DeliveryManagementDriverLocationResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "driver",
    header: "Driver ID",
  },
  {
    accessorKey: "coordinates",
    header: "Current Location",
    cell: ({ row }) => {
      const coords = row.getValue("coordinates") as { lon: number; lat: number };
      return (
        <span className="font-mono text-sm">
          {coords.lat.toFixed(6)}, {coords.lon.toFixed(6)}
        </span>
      );
    },
  },
  {
    accessorKey: "heading",
    header: "Heading",
    cell: ({ row }) => {
      const heading = row.getValue("heading") as { lon: number; lat: number };
      return (
        <span className="font-mono text-sm">
          {heading.lat.toFixed(2)}°
        </span>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: "Updated",
    cell: ({ row }) => {
      const date = row.getValue("timestamp") as string;
      return new Date(date).toLocaleString();
    },
  },
] satisfies ColumnDef<DriverLocationResponse>[];
