import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash, View } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatDate } from "@/components/utils";
import { WarehouseManagementOutboundShipmentItemsResponse } from "@/lib/pb.types";

type OutboundShipmentItemResponse =
  WarehouseManagementOutboundShipmentItemsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<OutboundShipmentItemResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Outbound Shipment Item ID copied to clipboard");
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
    label: "Edit Outbound Shipment Item",
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
    label: "Delete Outbound Shipment Item",
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

export const columns: ColumnDef<OutboundShipmentItemResponse>[] = [
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
    cell: ({ row }) => formatDate(row.getValue("created") as string),
  },
  {
    accessorKey: "updated",
    header: "Updated",
    cell: ({ row }) => formatDate(row.getValue("updated") as string),
  },
];
