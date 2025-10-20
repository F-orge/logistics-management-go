import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.wms.shape.stockTransfers>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "sourceWarehouseId",
    header: "Source Warehouse ID",
  },
  {
    accessorKey: "destinationWarehouseId",
    header: "Destination Warehouse ID",
  },
  {
    accessorKey: "productId",
    header: "Product ID",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "status",
    header: "Status",
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
