import { WarehouseManagementInboundShipmentItemsResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type InboundShipmentItemResponse = WarehouseManagementInboundShipmentItemsResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "inboundShipment",
    header: "Shipment ID",
  },
  {
    accessorKey: "product",
    header: "Product ID",
  },
  {
    accessorKey: "expectedQuantity",
    header: "Expected Quantity",
  },
  {
    accessorKey: "receivedQuantity",
    header: "Received Quantity",
    cell: ({ row }) => {
      const received = row.getValue("receivedQuantity") as number | undefined;
      return received ?? "-";
    },
  },
  {
    accessorKey: "discrepancyNotes",
    header: "Discrepancy Notes",
    cell: ({ row }) => {
      const notes = row.getValue("discrepancyNotes") as string | undefined;
      return notes ? notes.substring(0, 50) + "..." : "-";
    },
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
] satisfies ColumnDef<InboundShipmentItemResponse>[];
