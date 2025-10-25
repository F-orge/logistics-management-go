import { ColumnDef } from "@tanstack/react-table";
import { AccountTransactionsQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the account transaction type from the AccountTransactionsQuery
type AccountTransaction = NonNullable<AccountTransactionsQuery["billing"]>["accountTransactions"][number];

export const columns: ColumnDef<AccountTransaction>[] = [
  {
    header: "Transaction Details",
    columns: [
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
          return format(new Date(Number(transactionDate)), "PPP");
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
    id: "processedByUser",
    header: "Processed By",
    columns: [
      {
        accessorKey: "processedByUser.name",
        header: "Name",
        accessorFn: (row) => row.processedByUser?.name,
      },
      {
        accessorKey: "processedByUser.email",
        header: "Email",
        accessorFn: (row) => row.processedByUser?.email,
      },
    ],
  },
  {
    id: "clientAccount",
    header: "Client Account",
    columns: [
      {
        accessorKey: "clientAccount.walletBalance",
        header: "Wallet Balance",
        accessorFn: (row) => row.clientAccount?.walletBalance,
      },
      {
        accessorKey: "clientAccount.availableCredit",
        header: "Available Credit",
        accessorFn: (row) => row.clientAccount?.availableCredit,
      },
    ],
  },
  {
    id: "client",
    header: "Client Information",
    columns: [
      {
        accessorKey: "clientAccount.client.name",
        header: "Name",
        accessorFn: (row) => row.clientAccount?.client?.name,
      },
      {
        accessorKey: "clientAccount.client.phoneNumber",
        header: "Phone Number",
        accessorFn: (row) => row.clientAccount?.client?.phoneNumber,
      },
    ],
  },
];
