import { ColumnDef } from "@tanstack/react-table";
import { TableOutboundShipmentQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the outbound shipment type from the TableOutboundShipmentQuery
type OutboundShipment = NonNullable<TableOutboundShipmentQuery["wms"]>["outboundShipments"][number];

export const columns: ColumnDef<OutboundShipment>[] = [
  {
    header: "Shipment Details",
    columns: [
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
    id: "salesOrder",
    header: "Sales Order Information",
    columns: [
      {
        accessorKey: "salesOrder.orderNumber",
        header: "Order Number",
        accessorFn: (row) => row.salesOrder?.orderNumber,
      },
      {
        accessorKey: "salesOrder.shippingAddress",
        header: "Shipping Address",
        accessorFn: (row) => row.salesOrder?.shippingAddress,
      },
      {
        accessorKey: "salesOrder.status",
        header: "Status",
        accessorFn: (row) => row.salesOrder?.status,
      },
    ],
  },
];
