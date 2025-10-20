import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.crm.shape.attachments>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "fileName",
    header: "File Name",
  },
  {
    accessorKey: "filePath",
    header: "File Path",
  },
  {
    accessorKey: "mimeType",
    header: "Mime Type",
  },
  {
    accessorKey: "recordId",
    header: "Record ID",
  },
  {
    accessorKey: "recordType",
    header: "Record Type",
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
