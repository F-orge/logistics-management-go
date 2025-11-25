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
  formatDate,
  salesOrderStatusColors,
  statusBadgeCell,
} from "@/components/utils";
import {
  CustomerRelationsCompaniesResponse,
  WarehouseManagementSalesOrdersResponse,
} from "@/lib/pb.types";

type SalesOrderResponse = WarehouseManagementSalesOrdersResponse<{
  client: CustomerRelationsCompaniesResponse;
}>;

export const options: RecordListOptions = {
  expand: "client",
};

export const actions: ContextMenuItem<SalesOrderResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Sales Order ID copied to clipboard");
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
    label: "Edit Sales Order",
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
    label: "Delete Sales Order",
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

export const columns: ColumnDef<SalesOrderResponse>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order Number",
    cell: ({ row }) => {
      const client = row.original.expand?.client;
      return (
        <Item size="sm" className="p-0">
          <ItemContent className="gap-0.5">
            <ItemTitle>{row.getValue("orderNumber") as string}</ItemTitle>
            {client && <ItemDescription>{client.name}</ItemDescription>}
          </ItemContent>
        </Item>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {statusBadgeCell(
              row.getValue("status") as string,
              salesOrderStatusColors
            )}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "shippingAddress",
    header: "Shipping Address",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemDescription>
            {row.getValue("shippingAddress") as string}
          </ItemDescription>
        </ItemContent>
      </Item>
    ),
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
