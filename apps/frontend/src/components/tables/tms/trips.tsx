import { ColumnDef } from "@tanstack/react-table";
import { TableTripQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the trip type from the TableTripQuery
type Trip = NonNullable<TableTripQuery["tms"]>["trips"][number];

export const columns: ColumnDef<Trip>[] = [
  {
    header: "Trip Details",
    columns: [
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
          return format(new Date(Number(startTime)), "PPP p");
        },
      },
      {
        accessorKey: "endTime",
        header: "End Time",
        cell: ({ row }) => {
          const endTime = row.getValue("endTime") as string | null;
          if (!endTime) return "-";
          return format(new Date(Number(endTime)), "PPP p");
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
    ],
  },
  {
    id: "driver",
    header: "Driver Information",
    columns: [
      {
        accessorKey: "driver.user.name",
        header: "Name",
        accessorFn: (row) => row.driver?.user?.name,
      },
      {
        accessorKey: "driver.user.email",
        header: "Email",
        accessorFn: (row) => row.driver?.user?.email,
      },
      {
        accessorKey: "driver.contactPhone",
        header: "Phone",
        accessorFn: (row) => row.driver?.contactPhone,
      },
      {
        accessorKey: "driver.licenseNumber",
        header: "License Number",
        accessorFn: (row) => row.driver?.licenseNumber,
      },
      {
        accessorKey: "driver.status",
        header: "Status",
        accessorFn: (row) => row.driver?.status,
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