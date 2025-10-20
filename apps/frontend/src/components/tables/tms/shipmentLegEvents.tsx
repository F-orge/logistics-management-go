import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.tms.shape.shipmentLegEvents>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "shipmentLegId",
    header: "Shipment Leg ID",
  },
  {
    accessorKey: "eventTimestamp",
    header: "Event Timestamp",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "statusMessage",
    header: "Status Message",
  },
];
