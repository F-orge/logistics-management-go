import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.billing.shape.invoices>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "amountOutstanding",
    header: "Amount Outstanding",
  },
  {
    accessorKey: "amountPaid",
    header: "Amount Paid",
  },
  {
    accessorKey: "clientId",
    header: "Client ID",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "createdByUserId",
    header: "Created By User ID",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "discountAmount",
    header: "Discount Amount",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "paidAt",
    header: "Paid At",
  },
  {
    accessorKey: "paymentTerms",
    header: "Payment Terms",
  },
  {
    accessorKey: "quoteId",
    header: "Quote ID",
  },
  {
    accessorKey: "sentAt",
    header: "Sent At",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
  },
  {
    accessorKey: "taxAmount",
    header: "Tax Amount",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
