import { ColumnDef } from "@tanstack/react-table";
import { TableBillingInvoiceQuery } from "@packages/graphql/client/generated/graphql";

// Extract the billing invoice type from the TableBillingInvoiceQuery
type BillingInvoice = NonNullable<TableBillingInvoiceQuery["billing"]>["billingInvoices"][number];

export const columns: ColumnDef<BillingInvoice>[] = [
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const totalAmount = row.getValue("totalAmount") as number | null;
      const currency = row.original.currency;
      if (totalAmount === null || totalAmount === undefined) return "-";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "PHP",
      }).format(totalAmount);
    },
  },
  {
    accessorKey: "amountPaid",
    header: "Amount Paid",
    cell: ({ row }) => {
      const amountPaid = row.getValue("amountPaid") as number | null;
      const currency = row.original.currency;
      if (amountPaid === null || amountPaid === undefined) return "-";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "PHP",
      }).format(amountPaid);
    },
  },
  {
    accessorKey: "amountOutstanding",
    header: "Amount Outstanding",
    cell: ({ row }) => {
      const amountOutstanding = row.getValue("amountOutstanding") as number | null;
      const currency = row.original.currency;
      if (amountOutstanding === null || amountOutstanding === undefined) return "-";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "PHP",
      }).format(amountOutstanding);
    },
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
    cell: ({ row }) => {
      const issueDate = row.getValue("issueDate") as string | null;
      if (!issueDate) return "-";
      return new Date(issueDate).toLocaleDateString();
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const dueDate = row.getValue("dueDate") as string | null;
      if (!dueDate) return "-";
      return new Date(dueDate).toLocaleDateString();
    },
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