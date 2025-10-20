import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.crm.shape.cases>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "caseNumber",
    header: "Case Number",
  },
  {
    accessorKey: "contactId",
    header: "Contact ID",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "ownerId",
    header: "Owner ID",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "type",
    header: "Type",
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
