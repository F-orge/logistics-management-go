import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  formatDate,
  inventoryStockStatusColors,
  statusBadgeCell,
} from "@/components/utils";
import { WarehouseManagementInventoryStockResponse } from "@/lib/pb.types";

type InventoryStockResponse = WarehouseManagementInventoryStockResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<InventoryStockResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Inventory Stock ID copied to clipboard");
    },
  },
  {
    label: "Share Via QR Code",
    icon: <QrCode />,
    onSelect: (row, navigate) =>
      navigate({
        search: (prev) => ({ ...prev, action: "share", id: row.original.id }),
      }),
    divider: true,
  },
  {
    label: "Edit Inventory Stock",
    icon: <EditIcon />,
    onSelect: (row, navigate) =>
      navigate({
        search: (prev) => ({
          ...prev,
          action: "update",
          id: row.original.id,
        }),
      }),
    divider: true,
  },
  {
    label: "Delete Inventory Stock",
    variant: "destructive",
    icon: <Trash />,
    onSelect: (row, navigate) =>
      navigate({
        search: (prev) => ({
          ...prev,
          action: "delete",
          id: row.original.id,
        }),
      }),
  },
];

export const columns: ColumnDef<InventoryStockResponse>[] = [
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
    cell: ({ row }) =>
      statusBadgeCell(
        row.getValue("status") as string,
        inventoryStockStatusColors
      ),
  },
  {
    accessorKey: "lastMovementAt",
    header: "Last Movement",
    cell: ({ row }) => {
      const date = row.getValue("lastMovementAt") as string | undefined;
      return date ? formatDate(date) : "-";
    },
  },
  {
    accessorKey: "lastCountedAt",
    header: "Last Counted",
    cell: ({ row }) => {
      const date = row.getValue("lastCountedAt") as string | undefined;
      return date ? formatDate(date) : "-";
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("created") as string),
  },
];
