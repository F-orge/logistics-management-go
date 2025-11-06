import { BillingManagementPaymentsResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type PaymentResponse = BillingManagementPaymentsResponse;

export default [
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
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number | undefined;
      return amount
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)
        : "-";
    },
  },
  {
    accessorKey: "fees",
    header: "Fees",
    cell: ({ row }) => {
      const fees = row.getValue("fees") as number | undefined;
      return fees
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(fees)
        : "-";
    },
  },
  {
    accessorKey: "netAmount",
    header: "Net Amount",
    cell: ({ row }) => {
      const amount = row.getValue("netAmount") as number | undefined;
      return amount
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)
        : "-";
    },
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
    cell: ({ row }) => {
      const status = row.getValue("status") as string | undefined;
      const colors: Record<string, string> = {
        pending: "bg-yellow-100 text-yellow-800",
        processing: "bg-blue-100 text-blue-800",
        successful: "bg-green-100 text-green-800",
        failed: "bg-red-100 text-red-800",
        cancelled: "bg-gray-100 text-gray-800",
        refunded: "bg-purple-100 text-purple-800",
      };
      return (
        <span className={`px-2 py-1 rounded text-sm ${colors[status || ""] || ""}`}>
          {status ? status.replace(/-/g, " ") : "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => {
      const id = row.getValue("transactionId") as string | undefined;
      return id ? (
        <span className="font-mono text-sm">{id}</span>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "gatewayReferenceId",
    header: "Gateway Ref",
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    cell: ({ row }) => {
      const date = row.getValue("paymentDate") as string | undefined;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },
  {
    accessorKey: "processedAt",
    header: "Processed At",
    cell: ({ row }) => {
      const date = row.getValue("processedAt") as string | undefined;
      return date ? new Date(date).toLocaleString() : "-";
    },
  },
] satisfies ColumnDef<PaymentResponse>[];
