import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.wms.shape.salesOrderItems>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "salesOrderId",
    header: "Sales Order ID",
  },
  {
    accessorKey: "productId",
    header: "Product ID",
  },
  {
    accessorKey: "quantityOrdered",
    header: "Quantity Ordered",
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
