import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.wms.shape.products>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
  },
  {
    accessorKey: "clientId",
    header: "Client ID",
  },
  {
    accessorKey: "costPrice",
    header: "Cost Price",
  },
  {
    accessorKey: "description",
    header: "Description",
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
    accessorKey: "supplierId",
    header: "Supplier ID",
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
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
