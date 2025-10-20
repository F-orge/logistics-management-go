import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.wms.shape.returnItems>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "returnId",
    header: "Return ID",
  },
  {
    accessorKey: "productId",
    header: "Product ID",
  },
  {
    accessorKey: "quantityExpected",
    header: "Quantity Expected",
  },
  {
    accessorKey: "quantityReceived",
    header: "Quantity Received",
  },
  {
    accessorKey: "quantityVariance",
    header: "Quantity Variance",
  },
  {
    accessorKey: "condition",
    header: "Condition",
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
