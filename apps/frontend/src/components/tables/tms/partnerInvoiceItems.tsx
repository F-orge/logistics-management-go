import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.tms.shape.partnerInvoiceItems>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "partnerInvoiceId",
    header: "Partner Invoice ID",
  },
  {
    accessorKey: "shipmentLegId",
    header: "Shipment Leg ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
