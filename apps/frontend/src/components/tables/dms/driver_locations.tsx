import { ColumnDef } from "@tanstack/react-table";
import { TableDriverLocationQuery } from "@packages/graphql/client/generated/graphql";

// Extract the driver location type from the TableDriverLocationQuery
type DriverLocation = NonNullable<TableDriverLocationQuery["dms"]>["driverLocations"][number];

export const columns: ColumnDef<DriverLocation>[] = [
  {
    accessorKey: "driver.user.name",
    header: "Driver Name",
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
    accessorKey: "speedKmh",
    header: "Speed (km/h)",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
      const timestamp = row.getValue("timestamp") as string | null;
      if (!timestamp) return "-";
      return new Date(timestamp).toLocaleString();
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string | null;
      if (!createdAt) return "-";
      return new Date(createdAt).toLocaleDateString();
    },
  },
];