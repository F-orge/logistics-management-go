import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.tms.shape.shipmentLegs>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "carrierId",
    header: "Carrier ID",
  },
  {
    accessorKey: "internalTripId",
    header: "Internal Trip ID",
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "scheduledPickup",
    header: "Scheduled Pickup",
  },
  {
    accessorKey: "scheduledDelivery",
    header: "Scheduled Delivery",
  },
  {
    accessorKey: "actualPickup",
    header: "Actual Pickup",
  },
  {
    accessorKey: "actualDelivery",
    header: "Actual Delivery",
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
