import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.wms.shape.packageItems>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "packageId",
    header: "Package ID",
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
    accessorKey: "batchId",
    header: "Batch ID",
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
  },
  {
    accessorKey: "lotNumber",
    header: "Lot Number",
  },
  {
    accessorKey: "serialNumbers",
    header: "Serial Numbers",
  },
  {
    accessorKey: "totalWeight",
    header: "Total Weight",
  },
  {
    accessorKey: "unitWeight",
    header: "Unit Weight",
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
