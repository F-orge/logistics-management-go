import { ColumnDef } from "@tanstack/react-table";
import { TableShipmentLegQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the shipment leg type from the TableShipmentLegQuery
type ShipmentLeg = NonNullable<
  TableShipmentLegQuery["tms"]
>["shipmentLegs"][number];

export const columns: ColumnDef<ShipmentLeg>[] = [
  {
    header: "Leg Details",
    columns: [
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
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
          const createdAt = row.getValue("createdAt") as string | null;
          if (!createdAt) return "-";
          return format(new Date(Number(createdAt)), "PPP");
        },
      },
    ],
  },
  {
    id: "shipment",
    header: "Shipment Information",
    columns: [
      {
        accessorKey: "shipment.trackingNumber",
        header: "Tracking Number",
        accessorFn: (row) => row.shipment?.trackingNumber,
      },
      {
        accessorKey: "shipment.carrier",
        header: "Carrier",
        accessorFn: (row) => row.shipment?.carrier,
      },
      {
        accessorKey: "shipment.status",
        header: "Status",
        accessorFn: (row) => row.shipment?.status,
      },
    ],
  },
];
