import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash, View } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  formatCurrency,
  formatDate,
  statusBadgeCell,
  truncateText,
} from "@/components/utils";
import { WarehouseManagementProductsResponse } from "@/lib/pb.types";

type ProductResponse = WarehouseManagementProductsResponse;

const productStatusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  discontinued: "bg-red-100 text-red-800",
};

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<ProductResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Product ID copied to clipboard");
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
    label: "Edit Product",
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
    label: "Delete Product",
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

export const columns: ColumnDef<ProductResponse>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      statusBadgeCell(row.getValue("status") as string, productStatusColors),
  },
  {
    accessorKey: "costPrice",
    header: "Cost Price",
    cell: ({ row }) => {
      const price = row.getValue("costPrice") as number | undefined;
      return price ? formatCurrency(price) : "-";
    },
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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const desc = row.getValue("description") as string | undefined;
      return desc ? truncateText(desc, 50) : "-";
    },
  },
  {
    accessorKey: "supplier",
    header: "Supplier ID",
  },
  {
    accessorKey: "client",
    header: "Client ID",
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("created") as string),
  },
];
