import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash, View } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  booleanBadgeCell,
  formatCurrency,
  formatDate,
} from "@/components/utils";
import { WarehouseManagementPackagesResponse } from "@/lib/pb.types";

type PackageResponse = WarehouseManagementPackagesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<PackageResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Package ID copied to clipboard");
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
    label: "Edit Package",
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
    label: "Delete Package",
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

export const columns: ColumnDef<PackageResponse>[] = [
  {
    accessorKey: "salesOrder",
    header: "Sales Order ID",
  },
  {
    accessorKey: "packageNumber",
    header: "Package Number",
  },
  {
    accessorKey: "warehouse",
    header: "Warehouse ID",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "weight",
    header: "Weight (kg)",
  },
  {
    accessorKey: "length",
    header: "Length",
  },
  {
    accessorKey: "width",
    header: "Width",
  },
  {
    accessorKey: "height",
    header: "Height",
  },
  {
    accessorKey: "isFragile",
    header: "Fragile",
    cell: ({ row }) => {
      const isFragile = row.getValue("isFragile") as boolean | undefined;
      return isFragile ? (
        <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
          Fragile
        </span>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "isHazmat",
    header: "Hazmat",
    cell: ({ row }) => {
      const isHazmat = row.getValue("isHazmat") as boolean | undefined;
      return isHazmat ? (
        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm">
          Hazmat
        </span>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "requireSignature",
    header: "Requires Signature",
    cell: ({ row }) =>
      booleanBadgeCell(row.getValue("requireSignature") as boolean | undefined),
  },
  {
    accessorKey: "insuranceValue",
    header: "Insurance Value",
    cell: ({ row }) => {
      const value = row.getValue("insuranceValue") as number | undefined;
      return value ? formatCurrency(value) : "-";
    },
  },
  {
    accessorKey: "packedAt",
    header: "Packed At",
    cell: ({ row }) => {
      const date = row.getValue("packedAt") as string | undefined;
      return date ? formatDate(date) : "-";
    },
  },
  {
    accessorKey: "shippedAt",
    header: "Shipped At",
    cell: ({ row }) => {
      const date = row.getValue("shippedAt") as string | undefined;
      return date ? formatDate(date) : "-";
    },
  },
];
