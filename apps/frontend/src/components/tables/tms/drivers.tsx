import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.tms.shape.drivers>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "licenseNumber",
    header: "License Number",
  },
  {
    accessorKey: "contactNumber",
    header: "Contact Number",
  },
  {
    accessorKey: "licenseExpiryDate",
    header: "License Expiry Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "userId",
    header: "User ID",
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
