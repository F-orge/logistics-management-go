import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.crm.shape.interactions>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "contactId",
    header: "Contact ID",
  },
  {
    accessorKey: "caseId",
    header: "Case ID",
  },
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "interactionDate",
    header: "Interaction Date",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "outcome",
    header: "Outcome",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
