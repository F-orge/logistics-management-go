import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.billing.shape.disputes>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
    accessorKey: "disputedAmount",
    header: "Disputed Amount",
  },
  {
    accessorKey: "lineItemId",
    header: "Line Item ID",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "resolutionNotes",
    header: "Resolution Notes",
  },
  {
    accessorKey: "resolvedAt",
    header: "Resolved At",
  },
  {
    accessorKey: "resolvedByUserId",
    header: "Resolved By User ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
