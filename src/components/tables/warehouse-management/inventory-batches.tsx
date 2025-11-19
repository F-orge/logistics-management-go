import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash, View } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatDate } from "@/components/utils";
import { WarehouseManagementInventoryBatchesResponse } from "@/lib/pb.types";

type InventoryBatchResponse = WarehouseManagementInventoryBatchesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<InventoryBatchResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Inventory Batch ID copied to clipboard");
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
    label: "View Record",
    icon: <View />,
    onSelect: (row, navigate) =>
      navigate({
        search: (prev) => ({ ...prev, action: "view", id: row.original.id }),
      }),
  },
  {
    label: "Edit Inventory Batch",
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
    label: "Delete Inventory Batch",
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

export const columns: ColumnDef<InventoryBatchResponse>[] = [
  {
    accessorKey: "product",
    header: "Product ID",
  },
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
  },
  {
    accessorKey: "expirationDate",
    header: "Expiration Date",
    cell: ({ row }) => {
      const date = row.getValue("expirationDate") as string | undefined;
      if (!date) return "-";
      const expDate = new Date(date);
      const today = new Date();
      const isExpired = expDate < today;
      return (
        <span className={isExpired ? "text-red-600 font-semibold" : ""}>
          {expDate.toLocaleDateString()}
        </span>
      );
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
