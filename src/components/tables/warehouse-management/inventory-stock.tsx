import { WarehouseManagementInventoryStockResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type InventoryStockResponse = WarehouseManagementInventoryStockResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "product",
    header: "Product ID",
  },
  {
    accessorKey: "location",
    header: "Location ID",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const qty = row.getValue("quantity") as number | undefined;
      return qty ?? "-";
    },
  },
  {
    accessorKey: "reservedQuantity",
    header: "Reserved Quantity",
    cell: ({ row }) => {
      const reserved = row.getValue("reservedQuantity") as number | undefined;
      return reserved ? (
        <span className="text-orange-600">{reserved}</span>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string | undefined;
      const colors: Record<string, string> = {
        available: "bg-green-100 text-green-800",
        reserved: "bg-yellow-100 text-yellow-800",
        damaged: "bg-red-100 text-red-800",
        expired: "bg-red-100 text-red-800",
      };
      return (
        <span className={`px-2 py-1 rounded text-sm ${colors[status || ""] || ""}`}>
          {status || "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "lastMovementAt",
    header: "Last Movement",
    cell: ({ row }) => {
      const date = row.getValue("lastMovementAt") as string | undefined;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },
  {
    accessorKey: "lastCountedAt",
    header: "Last Counted",
    cell: ({ row }) => {
      const date = row.getValue("lastCountedAt") as string | undefined;
      return date ? new Date(date).toLocaleDateString() : "-";
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
] satisfies ColumnDef<InventoryStockResponse>[];
