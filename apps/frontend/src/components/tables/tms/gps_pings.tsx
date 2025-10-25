import { ColumnDef } from "@tanstack/react-table";
import { TableGpsPingQuery } from "@packages/graphql/client/generated/graphql";

// Extract the GPS ping type from the TableGpsPingQuery
type GpsPing = NonNullable<TableGpsPingQuery["tms"]>["gpsPings"][number];

export const columns: ColumnDef<GpsPing>[] = [
  {
    accessorKey: "vehicle.registrationNumber",
    header: "Vehicle",
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
    cell: ({ row }) => {
      const timestamp = row.getValue("timestamp") as string | null;
      if (!timestamp) return "-";
      return new Date(timestamp).toLocaleString();
    },
  },
];