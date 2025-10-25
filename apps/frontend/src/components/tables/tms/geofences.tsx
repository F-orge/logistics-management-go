import { ColumnDef } from "@tanstack/react-table";
import { TableGeofenceQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the geofence type from the TableGeofenceQuery
type Geofence = NonNullable<TableGeofenceQuery["tms"]>["geofences"][number];

export const columns: ColumnDef<Geofence>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string | null;
      if (!createdAt) return "-";
      return format(new Date(Number(createdAt)), "PPP");
    },
  },
];