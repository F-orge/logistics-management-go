import { ColumnDef } from "@tanstack/react-table";
import { TableVehicleQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

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
    accessorKey: "capacityVolume",
    header: "Capacity Volume",
  },
  {
    accessorKey: "capacityWeight",
    header: "Capacity Weight",
  },
  {
    accessorKey: "vin",
    header: "VIN",
  },
  {
    accessorKey: "lastMaintenanceDate",
    header: "Last Maintenance Date",
    cell: ({ row }) => {
      const lastMaintenanceDate = row.getValue("lastMaintenanceDate") as string | null;
      if (!lastMaintenanceDate) return "-";
      return format(new Date(Number(lastMaintenanceDate)), "PPP");
    },
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