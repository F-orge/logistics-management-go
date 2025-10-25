import { ColumnDef } from "@tanstack/react-table";
import { TableTripQuery } from "@packages/graphql/client/generated/graphql";

// Extract the trip type from the TableTripQuery
type Trip = NonNullable<TableTripQuery["tms"]>["trips"][number];

export const columns: ColumnDef<Trip>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "startLocation",
    header: "Start Location",
  },
  {
    accessorKey: "endLocation",
    header: "End Location",
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({ row }) => {
      const startTime = row.getValue("startTime") as string | null;
      if (!startTime) return "-";
      return new Date(startTime).toLocaleString();
    },
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    cell: ({ row }) => {
      const endTime = row.getValue("endTime") as string | null;
      if (!endTime) return "-";
      return new Date(endTime).toLocaleString();
    },
  },
  {
    accessorKey: "driver.user.name",
    header: "Driver",
  },
  {
    accessorKey: "vehicle.registrationNumber",
    header: "Vehicle",
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