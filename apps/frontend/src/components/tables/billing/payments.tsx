import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.billing.shape.payments>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "exchangeRate",
    header: "Exchange Rate",
  },
  {
    accessorKey: "fees",
    header: "Fees",
  },
  {
    accessorKey: "gatewayReference",
    header: "Gateway Reference",
  },
  {
    accessorKey: "invoiceId",
    header: "Invoice ID",
  },
  {
    accessorKey: "netAmount",
    header: "Net Amount",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "processedAt",
    header: "Processed At",
  },
  {
    accessorKey: "processedByUserId",
    header: "Processed By User ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
