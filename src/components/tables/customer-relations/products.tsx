import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  capitalize,
  formatCurrency,
  formatDate,
  truncateText,
} from "@/components/utils";
import { CustomerRelationsProductsResponse } from "@/lib/pb.types";

type ProductResponse = CustomerRelationsProductsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<ProductResponse>[] = [
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
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => capitalize(row.getValue("type") as string),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => formatCurrency(row.getValue("price") as number),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) =>
      truncateText(row.getValue("description") as string | undefined),
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
