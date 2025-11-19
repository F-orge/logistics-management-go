import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatDate, statusBadgeCell } from "@/components/utils";
import { WarehouseManagementReturnItemsResponse } from "@/lib/pb.types";

type ReturnItemResponse = WarehouseManagementReturnItemsResponse;

const itemConditionColors: Record<string, string> = {
  "like-new": "bg-green-100 text-green-800",
  good: "bg-green-100 text-green-800",
  fair: "bg-yellow-100 text-yellow-800",
  damaged: "bg-red-100 text-red-800",
};

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<ReturnItemResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Return Item ID copied to clipboard");
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
    label: "Edit Return Item",
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
    label: "Delete Return Item",
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

export const columns: ColumnDef<ReturnItemResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "return",
    header: "Return ID",
  },
  {
    accessorKey: "product",
    header: "Product ID",
  },
  {
    accessorKey: "quantityExpected",
    header: "Expected Quantity",
  },
  {
    accessorKey: "quantityRecevied",
    header: "Received Quantity",
  },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) =>
      statusBadgeCell(row.getValue("condition") as string, itemConditionColors),
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
