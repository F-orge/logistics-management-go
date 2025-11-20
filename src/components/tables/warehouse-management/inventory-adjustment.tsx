import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash, View } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { formatDate, formatLocationType } from "@/components/utils";
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
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>{row.getValue("product") as string}</ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "warehouse",
    header: "Warehouse",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>{row.getValue("warehouse") as string}</ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "quantityChange",
    header: "Adjustment",
    cell: ({ row }) => {
      const change = row.getValue("quantityChange") as number;
      const sign = change > 0 ? "+" : "";
      return (
        <Item size="sm" className="p-0">
          <ItemContent className="gap-0.5">
            <ItemTitle
              className={change > 0 ? "text-green-600" : "text-red-600"}
            >
              {sign}
              {change}
            </ItemTitle>
          </ItemContent>
        </Item>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {formatLocationType(row.getValue("reason") as string)}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "user",
    header: "Adjusted By",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>{row.getValue("user") as string}</ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => {
      const notes = row.getValue("notes") as string | undefined;
      return (
        <Item size="sm" className="p-0">
          <ItemContent className="gap-0.5">
            <ItemDescription>{notes ?? "-"}</ItemDescription>
          </ItemContent>
        </Item>
      );
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>{formatDate(row.getValue("created") as string)}</ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
];
