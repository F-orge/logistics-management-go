import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.tms.shape.expenses>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "tripId",
    header: "Trip ID",
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
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "expenseDate",
    header: "Expense Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "driverId",
    header: "Driver ID",
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
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
