import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.wms.shape.inboundShipmentItems>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "inboundShipmentId",
    header: "Inbound Shipment ID",
  },
  {
    accessorKey: "productId",
    header: "Product ID",
  },
  {
    accessorKey: "expectedQuantity",
    header: "Expected Quantity",
  },
  {
    accessorKey: "receivedQuantity",
    header: "Received Quantity",
  },
  {
    accessorKey: "discrepancyNotes",
    header: "Discrepancy Notes",
  },
  {
    accessorKey: "discrepancyQuantity",
    header: "Discrepancy Quantity",
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
