import { BillingManagementClientAccountsResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type ClientAccountResponse = BillingManagementClientAccountsResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "client",
    header: "Client ID",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "creditLimit",
    header: "Credit Limit",
    cell: ({ row }) => {
      const limit = row.getValue("creditLimit") as number | undefined;
      return limit
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(limit)
        : "-";
    },
  },
  {
    accessorKey: "availableCredit",
    header: "Available Credit",
    cell: ({ row }) => {
      const credit = row.getValue("availableCredit") as number | undefined;
      if (!credit) return "-";
      return (
        <span className={credit < 0 ? "text-red-600 font-semibold" : "text-green-600"}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(credit)}
        </span>
      );
    },
  },
  {
    accessorKey: "walletBalance",
    header: "Wallet Balance",
    cell: ({ row }) => {
      const balance = row.getValue("walletBalance") as number | undefined;
      return balance
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(balance)
        : "-";
    },
  },
  {
    accessorKey: "isCreditApproved",
    header: "Credit Approved",
    cell: ({ row }) => {
      const approved = row.getValue("isCreditApproved") as boolean | undefined;
      return approved ? (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
          Approved
        </span>
      ) : (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
          Not Approved
        </span>
      );
    },
  },
  {
    accessorKey: "paymentTermsDays",
    header: "Payment Terms (days)",
  },
  {
    accessorKey: "lastPaymentDate",
    header: "Last Payment",
    cell: ({ row }) => {
      const date = row.getValue("lastPaymentDate") as string | undefined;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("created") as string;
      return new Date(date).toLocaleDateString();
    },
  },
] satisfies ColumnDef<ClientAccountResponse>[];
