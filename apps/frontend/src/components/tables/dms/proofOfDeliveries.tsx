import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.dms.shape.proofOfDeliveries>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "deliveryTaskId",
    header: "Delivery Task ID",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "filePath",
    header: "File Path",
  },
  {
    accessorKey: "latitude",
    header: "Latitude",
  },
  {
    accessorKey: "longitude",
    header: "Longitude",
  },
  {
    accessorKey: "recipientName",
    header: "Recipient Name",
  },
  {
    accessorKey: "signatureData",
    header: "Signature Data",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
  },
  {
    accessorKey: "verificationCode",
    header: "Verification Code",
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
