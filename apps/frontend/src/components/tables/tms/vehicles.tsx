import { ColumnDef } from "@tanstack/react-table";
import { TableVehicleQuery } from "@packages/graphql/client/generated/graphql";

// Extract the vehicle type from the TableVehicleQuery
type Vehicle = NonNullable<TableVehicleQuery["tms"]>["vehicles"][number];

export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "registrationNumber",
    header: "Registration Number",
  },
  {
    accessorKey: "make",
    header: "Make",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "currentMileage",
    header: "Current Mileage",
  },
  {
    accessorKey: "lastMaintenanceDate",
    header: "Last Maintenance Date",
    cell: ({ row }) => {
      const lastMaintenanceDate = row.getValue("lastMaintenanceDate") as string | null;
      if (!lastMaintenanceDate) return "-";
      return new Date(lastMaintenanceDate).toLocaleDateString();
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