import { ColumnDef } from "@tanstack/react-table";
import { TableClientAccountQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the client account type from the TableClientAccountQuery
type ClientAccount = NonNullable<TableClientAccountQuery["billing"]>["clientAccounts"][number];

export const columns: ColumnDef<ClientAccount>[] = [
  {
    header: "Account Details",
    columns: [
      {
        accessorKey: "walletBalance",
        header: "Wallet Balance",
        cell: ({ row }) => {
          const walletBalance = row.getValue("walletBalance") as number | null;
          const currency = row.original.currency;
          if (walletBalance === null || walletBalance === undefined) return "-";
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency || "PHP",
          }).format(walletBalance);
        },
      },
      {
        accessorKey: "creditLimit",
        header: "Credit Limit",
        cell: ({ row }) => {
          const creditLimit = row.getValue("creditLimit") as number | null;
          const currency = row.original.currency;
          if (creditLimit === null || creditLimit === undefined) return "-";
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency || "PHP",
          }).format(creditLimit);
        },
      },
      {
        accessorKey: "availableCredit",
        header: "Available Credit",
        cell: ({ row }) => {
          const availableCredit = row.getValue("availableCredit") as number | null;
          const currency = row.original.currency;
          if (availableCredit === null || availableCredit === undefined) return "-";
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency || "PHP",
          }).format(availableCredit);
        },
      },
      {
        accessorKey: "isCreditApproved",
        header: "Credit Approved",
        cell: ({ row }) => {
          const isCreditApproved = row.getValue("isCreditApproved") as boolean | null;
          return isCreditApproved ? "Yes" : "No";
        },
      },
      {
        accessorKey: "paymentTermsDays",
        header: "Payment Terms (Days)",
      },
      {
        accessorKey: "lastPaymentDate",
        header: "Last Payment Date",
        cell: ({ row }) => {
          const lastPaymentDate = row.getValue("lastPaymentDate") as string | null;
          if (!lastPaymentDate) return "-";
          return format(new Date(Number(lastPaymentDate)), "PPP");
        },
      },
      {
        accessorKey: "currency",
        header: "Currency",
      },
    ],
  },
  {
    id: "client",
    header: "Client Information",
    columns: [
      {
        accessorKey: "client.name",
        header: "Name",
        accessorFn: (row) => row.client?.name,
      },
      {
        accessorKey: "client.industry",
        header: "Industry",
        accessorFn: (row) => row.client?.industry,
      },
      {
        accessorKey: "client.phoneNumber",
        header: "Phone Number",
        accessorFn: (row) => row.client?.phoneNumber,
      },
      {
        accessorKey: "client.country",
        header: "Country",
        accessorFn: (row) => row.client?.country,
      },
    ],
  },
];
