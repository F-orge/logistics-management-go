import { CustomerRelationsInvoicesResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type InvoiceResponse = CustomerRelationsInvoicesResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string | undefined;
      const colors: Record<string, string> = {
        draft: "bg-gray-100 text-gray-800",
        sent: "bg-blue-100 text-blue-800",
        paid: "bg-green-100 text-green-800",
        overdue: "bg-red-100 text-red-800",
        cancelled: "bg-red-100 text-red-800",
      };
      return (
        <span className={`px-2 py-1 rounded text-sm ${colors[status || ""] || ""}`}>
          {status || "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const total = row.getValue("total") as number | undefined;
      return total
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(total)
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
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => {
      const method = row.getValue("paymentMethod") as string | undefined;
      return method ? method.replace(/-/g, " ") : "-";
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
] satisfies ColumnDef<InvoiceResponse>[];
