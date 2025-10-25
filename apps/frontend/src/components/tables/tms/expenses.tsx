import { ColumnDef } from "@tanstack/react-table";
import { TableExpenseQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the expense type from the TableExpenseQuery
type Expense = NonNullable<TableExpenseQuery["tms"]>["expenses"][number];

export const columns: ColumnDef<Expense>[] = [
  {
    header: "Expense Details",
    columns: [
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "type",
        header: "Type",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
          const amount = row.getValue("amount") as number | null;
          const currency = row.original.currency;
          if (amount === null || amount === undefined) return "-";
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency || "PHP",
          }).format(amount);
        },
      },
      {
        accessorKey: "fuelQuantity",
        header: "Fuel Quantity",
      },
      {
        accessorKey: "odometerReading",
        header: "Odometer Reading",
      },
      {
        accessorKey: "receiptUrl",
        header: "Receipt URL",
      },
      {
        accessorKey: "expenseDate",
        header: "Expense Date",
        cell: ({ row }) => {
          const expenseDate = row.getValue("expenseDate") as string | null;
          if (!expenseDate) return "-";
          return format(new Date(Number(expenseDate)), "PPP");
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
    id: "trip",
    header: "Trip Information",
    columns: [
      {
        accessorKey: "trip.startLocation",
        header: "Start Location",
        accessorFn: (row) => row.trip?.startLocation,
      },
      {
        accessorKey: "trip.endLocation",
        header: "End Location",
        accessorFn: (row) => row.trip?.endLocation,
      },
      {
        accessorKey: "trip.status",
        header: "Status",
        accessorFn: (row) => row.trip?.status,
      },
      {
        accessorKey: "trip.startTime",
        header: "Start Time",
        accessorFn: (row) => row.trip?.startTime,
        cell: ({ row }) => {
          const startTime = row.original.trip?.startTime;
          if (!startTime) return "-";
          return format(new Date(Number(startTime)), "PPP p");
        },
      },
      {
        accessorKey: "trip.endTime",
        header: "End Time",
        accessorFn: (row) => row.trip?.endTime,
        cell: ({ row }) => {
          const endTime = row.original.trip?.endTime;
          if (!endTime) return "-";
          return format(new Date(Number(endTime)), "PPP p");
        },
      },
      {
        accessorKey: "trip.vehicle.registrationNumber",
        header: "Vehicle Registration",
        accessorFn: (row) => row.trip?.vehicle?.registrationNumber,
      },
      {
        accessorKey: "trip.vehicle.make",
        header: "Vehicle Make",
        accessorFn: (row) => row.trip?.vehicle?.make,
      },
      {
        accessorKey: "trip.vehicle.model",
        header: "Vehicle Model",
        accessorFn: (row) => row.trip?.vehicle?.model,
      },
      {
        accessorKey: "trip.vehicle.year",
        header: "Vehicle Year",
        accessorFn: (row) => row.trip?.vehicle?.year,
      },
      {
        accessorKey: "trip.vehicle.vin",
        header: "Vehicle VIN",
        accessorFn: (row) => row.trip?.vehicle?.vin,
      },
    ],
  },
];