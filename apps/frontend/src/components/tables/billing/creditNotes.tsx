import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.billing.shape.creditNotes>
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
    accessorKey: "appliedAt",
    header: "Applied At",
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
    accessorKey: "creditNoteNumber",
    header: "Credit Note Number",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "disputeId",
    header: "Dispute ID",
  },
  {
    accessorKey: "invoiceId",
    header: "Invoice ID",
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
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
