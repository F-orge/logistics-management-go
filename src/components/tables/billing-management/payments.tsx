import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  formatCurrency,
  formatDate,
  paymentStatusColors,
  statusBadgeCell,
} from "@/components/utils";
import { BillingManagementPaymentsResponse } from "@/lib/pb.types";

type PaymentResponse = BillingManagementPaymentsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<PaymentResponse>[] = [
  {
    label: "Edit Payment",
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
    label: "Delete Payment",
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

export const columns: ColumnDef<PaymentResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "invoice",
    header: "Invoice ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatCurrency(row.getValue("amount") as number),
  },
  {
    accessorKey: "fees",
    header: "Fees",
    cell: ({ row }) => formatCurrency(row.getValue("fees") as number),
  },
  {
    accessorKey: "netAmount",
    header: "Net Amount",
    cell: ({ row }) => formatCurrency(row.getValue("netAmount") as number),
  },
  {
    accessorKey: "paymentMethod",
    header: "Method",
    cell: ({ row }) => {
      const method = row.getValue("paymentMethod") as string | undefined;
      return method ? method.replace(/-/g, " ") : "-";
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      statusBadgeCell(row.getValue("status") as string, paymentStatusColors),
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => {
      const id = row.getValue("transactionId") as string | undefined;
      return id ? <span className="font-mono text-sm">{id}</span> : "-";
    },
  },
  {
    accessorKey: "gatewayReferenceId",
    header: "Gateway Ref",
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    cell: ({ row }) => formatDate(row.getValue("paymentDate") as string),
  },
  {
    accessorKey: "processedAt",
    header: "Processed At",
    cell: ({ row }) => {
      const date = row.getValue("processedAt") as string | undefined;
      return date ? new Date(date).toLocaleString() : "-";
    },
  },
];
