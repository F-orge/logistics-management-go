import { ColumnDef } from "@tanstack/react-table";
import { TableGpsPingQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the GPS ping type from the TableGpsPingQuery
type GpsPing = NonNullable<TableGpsPingQuery["tms"]>["gpsPings"][number];

export const columns: ColumnDef<GpsPing>[] = [
  {
    header: "GPS Ping Details",
    columns: [
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
          return format(new Date(Number(timestamp)), "PPP p");
        },
      },
    ],
  },
  {
    id: "vehicle",
    header: "Vehicle Information",
    columns: [
      {
        accessorKey: "vehicle.registrationNumber",
        header: "Registration Number",
        accessorFn: (row) => row.vehicle?.registrationNumber,
      },
      {
        accessorKey: "vehicle.make",
        header: "Make",
        accessorFn: (row) => row.vehicle?.make,
      },
      {
        accessorKey: "vehicle.model",
        header: "Model",
        accessorFn: (row) => row.vehicle?.model,
      },
      {
        accessorKey: "vehicle.year",
        header: "Year",
        accessorFn: (row) => row.vehicle?.year,
      },
      {
        accessorKey: "vehicle.vin",
        header: "VIN",
        accessorFn: (row) => row.vehicle?.vin,
      },
      {
        accessorKey: "vehicle.status",
        header: "Status",
        accessorFn: (row) => row.vehicle?.status,
      },
    ],
  },
];