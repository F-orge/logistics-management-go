import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.billing.shape.documents>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "documentType",
    header: "Document Type",
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
    accessorKey: "fileSize",
    header: "File Size",
  },
  {
    accessorKey: "mimeType",
    header: "MIME Type",
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
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    accessorKey: "uploadedByUserId",
    header: "Uploaded By User ID",
  },
];
