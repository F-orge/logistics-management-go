import { WarehouseManagementOutboundShipmentsResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type OutboundShipmentResponse = WarehouseManagementOutboundShipmentsResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "salesOrder",
    header: "Sales Order ID",
  },
  {
    accessorKey: "warehouse",
    header: "Warehouse ID",
  },
  {
    accessorKey: "trackingNumber",
    header: "Tracking Number",
    cell: ({ row }) => {
      const tracking = row.getValue("trackingNumber") as string;
      return (
        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
          {tracking}
        </span>
      );
    },
  },
  {
    accessorKey: "carrier",
    header: "Carrier ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string | undefined;
      const colors: Record<string, string> = {
        pending: "bg-yellow-100 text-yellow-800",
        processed: "bg-blue-100 text-blue-800",
        shipped: "bg-blue-100 text-blue-800",
        delivered: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
      };
      return (
        <span className={`px-2 py-1 rounded text-sm ${colors[status || ""] || ""}`}>
          {status || "-"}
        </span>
      );
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
] satisfies ColumnDef<OutboundShipmentResponse>[];
