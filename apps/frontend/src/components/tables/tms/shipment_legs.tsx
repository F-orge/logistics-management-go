import { ColumnDef } from "@tanstack/react-table";
import { TableShipmentLegQueryQuery } from "@packages/graphql/client/generated/graphql";

// Extract the shipment leg type from the TableShipmentLegQuery
type ShipmentLeg = NonNullable<
  TableShipmentLegQueryQuery["tms"]
>["shipmentLegs"][number];

export const columns: ColumnDef<ShipmentLeg>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "legSequence",
    header: "Leg Sequence",
  },
  {
    accessorKey: "startLocation",
    header: "Start Location",
  },
  {
    accessorKey: "endLocation",
    header: "End Location",
  },
  {
    accessorKey: "shipment.trackingNumber",
    header: "Tracking Number",
  },
  {
    accessorKey: "shipment.carrier",
    header: "Carrier",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string | null;
      if (!createdAt) return "-";
      return new Date(createdAt).toLocaleDateString();
    },
  },
];
