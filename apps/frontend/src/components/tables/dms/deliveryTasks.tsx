import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.dms.shape.deliveryTasks>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "deliveryRouteId",
    header: "Delivery Route ID",
  },
  {
    accessorKey: "packageId",
    header: "Package ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "failureReason",
    header: "Failure Reason",
  },
  {
    accessorKey: "estimatedArrivalTime",
    header: "Estimated Arrival Time",
  },
  {
    accessorKey: "deliveryTime",
    header: "Delivery Time",
  },
  {
    accessorKey: "deliveryAddress",
    header: "Delivery Address",
  },
  {
    accessorKey: "recipientName",
    header: "Recipient Name",
  },
  {
    accessorKey: "recipientPhone",
    header: "Recipient Phone",
  },
  {
    accessorKey: "deliveryInstructions",
    header: "Delivery Instructions",
  },
  {
    accessorKey: "actualArrivalTime",
    header: "Actual Arrival Time",
  },
  {
    accessorKey: "routeSequence",
    header: "Route Sequence",
  },
  {
    accessorKey: "attemptCount",
    header: "Attempt Count",
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
