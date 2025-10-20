import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.billing.shape.accountTransactions>
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
    accessorKey: "clientAccountId",
    header: "Client Account ID",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "processedByUserId",
    header: "Processed By User ID",
  },
  {
    accessorKey: "referenceNumber",
    header: "Reference Number",
  },
  {
    accessorKey: "runningBalance",
    header: "Running Balance",
  },
  {
    accessorKey: "sourceRecordId",
    header: "Source Record ID",
  },
  {
    accessorKey: "sourceRecordType",
    header: "Source Record Type",
  },
  {
    accessorKey: "transactionDate",
    header: "Transaction Date",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
