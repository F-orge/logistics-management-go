import { ColumnDef } from "@tanstack/react-table";
import { TablePaymentQuery } from "@packages/graphql/client/generated/graphql";

// Extract the payment type from the TablePaymentQuery
type Payment = NonNullable<TablePaymentQuery["billing"]>["payments"][number];

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "invoice.invoiceNumber",
    header: "Invoice Number",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number | null;
      const currency = row.original.currency;
      if (amount === null || amount === undefined) return "-";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "PHP",
      }).format(amount);
    },
  },
  {
    accessorKey: "fees",
    header: "Fees",
    cell: ({ row }) => {
      const fees = row.getValue("fees") as number | null;
      const currency = row.original.currency;
      if (fees === null || fees === undefined) return "-";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "PHP",
      }).format(fees);
    },
  },
  {
    accessorKey: "gatewayReference",
    header: "Gateway Reference",
  },
  {
    accessorKey: "processedByUser.name",
    header: "Processed By",
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