import { ColumnDef } from "@tanstack/react-table";
import { AccountTransactionsQuery } from "@packages/graphql/client/generated/graphql";

// Extract the account transaction type from the AccountTransactionsQuery
type AccountTransaction = NonNullable<AccountTransactionsQuery["billing"]>["accountTransactions"][number];

export const columns: ColumnDef<AccountTransaction>[] = [
  {
    accessorKey: "referenceNumber",
    header: "Reference Number",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number | null;
      if (amount === null || amount === undefined) return "-";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP", // Assuming PHP as default currency
      }).format(amount);
    },
  },
  {
    accessorKey: "runningBalance",
    header: "Running Balance",
    cell: ({ row }) => {
      const runningBalance = row.getValue("runningBalance") as number | null;
      if (runningBalance === null || runningBalance === undefined) return "-";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP", // Assuming PHP as default currency
      }).format(runningBalance);
    },
  },
  {
    accessorKey: "transactionDate",
    header: "Transaction Date",
    cell: ({ row }) => {
      const transactionDate = row.getValue("transactionDate") as string | null;
      if (!transactionDate) return "-";
      return new Date(transactionDate).toLocaleDateString();
    },
  },
  {
    accessorKey: "processedByUser.name",
    header: "Processed By",
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