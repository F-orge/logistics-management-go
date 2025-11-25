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
import {
  booleanBadgeCell,
  formatCurrency,
  formatDate,
} from "@/components/utils";
import {
  WarehouseManagementPackagesResponse,
  WarehouseManagementSalesOrdersResponse,
  WarehouseManagementWarehousesResponse,
} from "@/lib/pb.types";

type PackageResponse = WarehouseManagementPackagesResponse<{
  salesOrder: WarehouseManagementSalesOrdersResponse;
  warehouse: WarehouseManagementWarehousesResponse;
}>;

export const options: RecordListOptions = {
  expand: "salesOrder,warehouse",
};

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
    accessorKey: "packageNumber",
    header: "Package",
    cell: ({ row }) => {
      const type = row.original.type;
      const weight = row.original.weight;
      return (
        <Item size="sm" className="p-0">
          <ItemContent className="gap-0.5">
            <ItemTitle>{row.getValue("packageNumber") as string}</ItemTitle>
            <ItemDescription>
              {type} | {weight ?? "-"} kg
            </ItemDescription>
          </ItemContent>
        </Item>
      );
    },
  },
  {
    accessorKey: "salesOrder",
    header: "Sales Order",
    cell: ({ row }) => {
      const salesOrder = row.original.expand?.salesOrder;
      return (
        <Item size="sm" className="p-0">
          <ItemContent className="gap-0.5">
            <ItemTitle>{salesOrder?.orderNumber ?? "-"}</ItemTitle>
          </ItemContent>
        </Item>
      );
    },
  },
  {
    accessorKey: "warehouse",
    header: "Warehouse",
    cell: ({ row }) => {
      const warehouse = row.original.expand?.warehouse;
      return (
        <Item size="sm" className="p-0">
          <ItemContent className="gap-0.5">
            <ItemTitle>{warehouse?.name ?? "-"}</ItemTitle>
            {warehouse?.city && (
              <ItemDescription>{warehouse.city}</ItemDescription>
            )}
          </ItemContent>
        </Item>
      );
    },
  },
  {
    accessorKey: "isFragile",
    header: "Conditions",
    cell: ({ row }) => {
      const isFragile = row.getValue("isFragile") as boolean | undefined;
      const isHazmat = row.original.isHazmat;
      const requireSignature = row.original.requireSignature;
      const badges = [];
      if (isFragile)
        badges.push(
          <span
            key="fragile"
            className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm"
          >
            Fragile
          </span>
        );
      if (isHazmat)
        badges.push(
          <span
            key="hazmat"
            className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm"
          >
            Hazmat
          </span>
        );
      if (requireSignature)
        badges.push(
          <span
            key="sig"
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
          >
            Signature
          </span>
        );
      return (
        <Item size="sm" className="p-0">
          <ItemContent className="gap-1 flex flex-wrap">
            {badges.length > 0 ? badges : "-"}
          </ItemContent>
        </Item>
      );
    },
  },
  {
    accessorKey: "insuranceValue",
    header: "Insurance Value",
    cell: ({ row }) => {
      const value = row.getValue("insuranceValue") as number | undefined;
      return (
        <Item size="sm" className="p-0">
          <ItemContent className="gap-0.5">
            <ItemTitle>{value ? formatCurrency(value) : "-"}</ItemTitle>
          </ItemContent>
        </Item>
      );
    },
  },
  {
    accessorKey: "shippedAt",
    header: "Timeline",
    cell: ({ row }) => {
      const packed = row.original.packedAt;
      const shipped = row.getValue("shippedAt") as string | undefined;
      return (
        <Item size="sm" className="p-0">
          <ItemContent className="gap-0.5">
            {shipped && <ItemTitle>Shipped: {formatDate(shipped)}</ItemTitle>}
            {packed && (
              <ItemDescription>Packed: {formatDate(packed)}</ItemDescription>
            )}
            {!shipped && !packed && <ItemTitle>-</ItemTitle>}
          </ItemContent>
        </Item>
      );
    },
  },
];
