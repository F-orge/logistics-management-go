import { BillingManagementInvoiceLineItemsResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type InvoiceLineItemResponse = BillingManagementInvoiceLineItemsResponse;

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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const desc = row.getValue("description") as string | undefined;
      return desc ? desc.substring(0, 50) + "..." : "-";
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "unitPrice",
    header: "Unit Price",
    cell: ({ row }) => {
      const price = row.getValue("unitPrice") as number | undefined;
      return price
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)
        : "-";
    },
  },
  {
    accessorKey: "discountRate",
    header: "Discount %",
    cell: ({ row }) => {
      const rate = row.getValue("discountRate") as number | undefined;
      return rate ? `${rate}%` : "-";
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
    accessorKey: "taxRate",
    header: "Tax %",
    cell: ({ row }) => {
      const rate = row.getValue("taxRate") as number | undefined;
      return rate ? `${rate}%` : "-";
    },
  },
  {
    accessorKey: "taxAmount",
    header: "Tax",
    cell: ({ row }) => {
      const amount = row.getValue("taxAmount") as number | undefined;
      return amount
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)
        : "-";
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
] satisfies ColumnDef<InvoiceLineItemResponse>[];
