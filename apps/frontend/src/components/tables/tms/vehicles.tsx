import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.tms.shape.vehicles>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "model",
    header: "Model",
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
    accessorKey: "registrationNumber",
    header: "Registration Number",
  },
  {
    accessorKey: "make",
    header: "Make",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "vin",
    header: "VIN",
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
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
