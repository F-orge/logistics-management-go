import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.wms.shape.returns>
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
    accessorKey: "returnNumber",
    header: "Return Number",
  },
  {
    accessorKey: "salesOrderId",
    header: "Sales Order ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "reason",
    header: "Reason",
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
