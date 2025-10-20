import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.billing.shape.clientAccounts>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "availableCredit",
    header: "Available Credit",
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
    accessorKey: "creditLimit",
    header: "Credit Limit",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "isCreditApproved",
    header: "Is Credit Approved",
  },
  {
    accessorKey: "lastPaymentDate",
    header: "Last Payment Date",
  },
  {
    accessorKey: "paymentTermsDays",
    header: "Payment Terms Days",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    accessorKey: "walletBalance",
    header: "Wallet Balance",
  },
];
