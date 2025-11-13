import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  accountTransactionStatusColors,
  formatCurrency,
  formatDate,
  statusBadgeCell,
} from "@/components/utils";
import { BillingManagementAccountTransactionsResponse } from "@/lib/pb.types";

type AccountTransactionResponse = BillingManagementAccountTransactionsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<AccountTransactionResponse>[] = [
  {
    label: "Edit Transaction",
    icon: <EditIcon />,
    onSelect: (row, navigate) =>
      navigate({
        search: (prev) => ({
          ...prev,
          action: "update",
          id: row.original.id,
        }),
      }),
    divider: true,
  },
  {
    label: "Delete Transaction",
    variant: "destructive",
    icon: <Trash />,
    onSelect: (row, navigate) =>
      navigate({
        search: (prev) => ({
          ...prev,
          action: "delete",
          id: row.original.id,
        }),
      }),
  },
];

export const columns: ColumnDef<AccountTransactionResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "clientAccount",
    header: "Client Account ID",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) =>
      statusBadgeCell(
        row.getValue("type") as string,
        accountTransactionStatusColors
      ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const type = row.original.type as string;
      const sign = type === "debit" || type === "fee" ? "-" : "+";
      return (
        <span
          className={
            type === "debit" || type === "fee"
              ? "text-red-600"
              : "text-green-600"
          }
        >
          {sign}
          {formatCurrency(amount)}
        </span>
      );
    },
  },
  {
    accessorKey: "runningBalance",
    header: "Running Balance",
    cell: ({ row }) => formatCurrency(row.getValue("runningBalance") as number),
  },
  {
    accessorKey: "referenceNumber",
    header: "Reference #",
  },
  {
    accessorKey: "transactionDate",
    header: "Transaction Date",
    cell: ({ row }) => formatDate(row.getValue("transactionDate") as string),
  },
  {
    accessorKey: "processedBy",
    header: "Processed By",
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("created") as string;
      return new Date(date).toLocaleString();
    },
  },
];
