import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.tms.shape.tripStops>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "tripId",
    header: "Trip ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "actualArrivalTime",
    header: "Actual Arrival Time",
  },
  {
    accessorKey: "actualDepartureTime",
    header: "Actual Departure Time",
  },
  {
    accessorKey: "estimatedArrivalTime",
    header: "Estimated Arrival Time",
  },
  {
    accessorKey: "estimatedDepartureTime",
    header: "Estimated Departure Time",
  },
  {
    accessorKey: "sequence",
    header: "Sequence",
  },
  {
    accessorKey: "shipmentId",
    header: "Shipment ID",
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
