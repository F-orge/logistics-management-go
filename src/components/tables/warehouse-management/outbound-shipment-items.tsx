import { WarehouseManagementOutboundShipmentItemsResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type OutboundShipmentItemResponse = WarehouseManagementOutboundShipmentItemsResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "outboundShipment",
    header: "Shipment ID",
  },
  {
    accessorKey: "product",
    header: "Product ID",
  },
  {
    accessorKey: "salesOrderItem",
    header: "Sales Order Item ID",
  },
  {
    accessorKey: "quantityShipped",
    header: "Quantity Shipped",
  },
  {
    accessorKey: "batch",
    header: "Batch ID",
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("created") as string;
      return new Date(date).toLocaleDateString();
    },
  },
  {
    accessorKey: "updated",
    header: "Updated",
    cell: ({ row }) => {
      const date = row.getValue("updated") as string;
      return new Date(date).toLocaleDateString();
    },
  },
] satisfies ColumnDef<OutboundShipmentItemResponse>[];
