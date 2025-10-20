import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.billing.shape.quotes>
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
    accessorKey: "createdByUserId",
    header: "Created By User ID",
  },
  {
    accessorKey: "destinationDetails",
    header: "Destination Details",
  },
  {
    accessorKey: "expiresAt",
    header: "Expires At",
  },
  {
    accessorKey: "height",
    header: "Height",
  },
  {
    accessorKey: "length",
    header: "Length",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "originDetails",
    header: "Origin Details",
  },
  {
    accessorKey: "quotedPrice",
    header: "Quoted Price",
  },
  {
    accessorKey: "quoteNumber",
    header: "Quote Number",
  },
  {
    accessorKey: "serviceLevel",
    header: "Service Level",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    accessorKey: "volume",
    header: "Volume",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "width",
    header: "Width",
  },
];
