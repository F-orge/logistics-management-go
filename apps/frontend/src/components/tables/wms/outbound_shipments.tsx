import { ColumnDef } from "@tanstack/react-table";
import { TableOutboundShipmentQuery } from "@packages/graphql/client/generated/graphql";

// Extract the outbound shipment type from the TableOutboundShipmentQuery
type OutboundShipment = NonNullable<TableOutboundShipmentQuery["wms"]>["outboundShipments"][number];

export const columns: ColumnDef<OutboundShipment>[] = [
  {
    accessorKey: "trackingNumber",
    header: "Tracking Number",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "carrier",
    header: "Carrier",
  },
  {
    accessorKey: "salesOrder.orderNumber",
    header: "Sales Order",
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