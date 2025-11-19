import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  formatDate,
  formatLocationType,
  truncateText,
} from "@/components/utils";
import { WarehouseManagementInventoryAdjustmentResponse } from "@/lib/pb.types";

type InventoryAdjustmentResponse =
  WarehouseManagementInventoryAdjustmentResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<InventoryAdjustmentResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Inventory Adjustment ID copied to clipboard");
    },
    divider: true,
  },
  {
    label: "Edit Inventory Adjustment",
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
    label: "Delete Inventory Adjustment",
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

export const columns: ColumnDef<InventoryAdjustmentResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "product",
    header: "Product ID",
  },
  {
    accessorKey: "warehouse",
    header: "Warehouse ID",
  },
  {
    accessorKey: "quantityChange",
    header: "Quantity Change",
    cell: ({ row }) => {
      const change = row.getValue("quantityChange") as number;
      const sign = change > 0 ? "+" : "";
      return (
        <span className={change > 0 ? "text-green-600" : "text-red-600"}>
          {sign}
          {change}
        </span>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => formatLocationType(row.getValue("reason") as string),
  },
  {
    accessorKey: "user",
    header: "User ID",
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => {
      const notes = row.getValue("notes") as string | undefined;
      return notes ? truncateText(notes, 50) : "-";
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("created") as string),
  },
  {
    accessorKey: "updated",
    header: "Updated",
    cell: ({ row }) => formatDate(row.getValue("updated") as string),
  },
];
