import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.wms.shape.packages>
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
    accessorKey: "warehouseId",
    header: "Warehouse ID",
  },
  {
    accessorKey: "packageNumber",
    header: "Package Number",
  },
  {
    accessorKey: "trackingNumber",
    header: "Tracking Number",
  },
  {
    accessorKey: "carrier",
    header: "Carrier",
  },
  {
    accessorKey: "serviceLevel",
    header: "Service Level",
  },
  {
    accessorKey: "packageType",
    header: "Package Type",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "length",
    header: "Length",
  },
  {
    accessorKey: "width",
    header: "Width",
  },
  {
    accessorKey: "height",
    header: "Height",
  },
  {
    accessorKey: "volume",
    header: "Volume",
  },
  {
    accessorKey: "insuranceValue",
    header: "Insurance Value",
  },
  {
    accessorKey: "isFragile",
    header: "Is Fragile",
  },
  {
    accessorKey: "isHazmat",
    header: "Is Hazmat",
  },
  {
    accessorKey: "requiresSignature",
    header: "Requires Signature",
  },
  {
    accessorKey: "packedAt",
    header: "Packed At",
  },
  {
    accessorKey: "packedByUserId",
    header: "Packed By User ID",
  },
  {
    accessorKey: "shippedAt",
    header: "Shipped At",
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
