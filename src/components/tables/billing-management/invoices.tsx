import { BillingManagementInvoicesResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type InvoiceResponse = BillingManagementInvoicesResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice #",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string | undefined;
      const colors: Record<string, string> = {
        draft: "bg-gray-100 text-gray-800",
        sent: "bg-blue-100 text-blue-800",
        viewed: "bg-blue-100 text-blue-800",
        paid: "bg-green-100 text-green-800",
        "partial-paid": "bg-yellow-100 text-yellow-800",
        "past-due": "bg-red-100 text-red-800",
        disputed: "bg-orange-100 text-orange-800",
        cancelled: "bg-red-100 text-red-800",
        void: "bg-red-100 text-red-800",
      };
      return (
        <span className={`px-2 py-1 rounded text-sm ${colors[status || ""] || ""}`}>
          {status ? status.replace(/-/g, " ") : "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
    cell: ({ row }) => {
      const amount = row.getValue("subtotal") as number | undefined;
      return amount
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)
        : "-";
    },
  },
  {
    accessorKey: "discountAmount",
    header: "Discount",
    cell: ({ row }) => {
      const amount = row.getValue("discountAmount") as number | undefined;
      return amount
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)
        : "-";
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => {
      const amount = row.getValue("totalAmount") as number | undefined;
      return amount ? (
        <span className="font-semibold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)}
        </span>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "amountPaid",
    header: "Amount Paid",
    cell: ({ row }) => {
      const amount = row.getValue("amountPaid") as number | undefined;
      return amount
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)
        : "-";
    },
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
    cell: ({ row }) => {
      const date = row.getValue("issueDate") as string | undefined;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const date = row.getValue("dueDate") as string | undefined;
      if (!date) return "-";
      const dueDate = new Date(date);
      const today = new Date();
      const isOverdue = dueDate < today;
      return (
        <span className={isOverdue ? "text-red-600 font-semibold" : ""}>
          {dueDate.toLocaleDateString()}
        </span>
      );
    },
  },
  {
    accessorKey: "sentAt",
    header: "Sent At",
    cell: ({ row }) => {
      const date = row.getValue("sentAt") as string | undefined;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },
  {
    accessorKey: "paidAt",
    header: "Paid At",
    cell: ({ row }) => {
      const date = row.getValue("paidAt") as string | undefined;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },
] satisfies ColumnDef<InvoiceResponse>[];
