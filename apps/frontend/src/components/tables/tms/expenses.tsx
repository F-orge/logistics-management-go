import { ColumnDef } from "@tanstack/react-table";
import { TableExpenseQuery } from "@packages/graphql/client/generated/graphql";

// Extract the expense type from the TableExpenseQuery
type Expense = NonNullable<TableExpenseQuery["tms"]>["expenses"][number];

export const columns: ColumnDef<Expense>[] = [
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
    accessorKey: "expenseDate",
    header: "Expense Date",
    cell: ({ row }) => {
      const expenseDate = row.getValue("expenseDate") as string | null;
      if (!expenseDate) return "-";
      return new Date(expenseDate).toLocaleDateString();
    },
  },
  {
    accessorKey: "driver.user.name",
    header: "Driver",
  },
  {
    accessorKey: "trip.vehicle.registrationNumber",
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