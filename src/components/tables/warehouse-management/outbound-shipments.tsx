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
  outboundShipmentStatusColors,
  statusBadgeCell,
} from "@/components/utils";
import {
  TransportManagementCarriersResponse,
  WarehouseManagementOutboundShipmentsResponse,
  WarehouseManagementSalesOrdersResponse,
  WarehouseManagementWarehousesResponse,
} from "@/lib/pb.types";

type OutboundShipmentResponse = WarehouseManagementOutboundShipmentsResponse<{
  warehouse: WarehouseManagementWarehousesResponse;
  carrier: TransportManagementCarriersResponse;
  salesOrder: WarehouseManagementSalesOrdersResponse;
}>;

export const options: RecordListOptions = {
  expand: "warehouse,carrier,salesOrder",
};

export const actions: ContextMenuItem<OutboundShipmentResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Outbound Shipment ID copied to clipboard");
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
    label: "Edit Outbound Shipment",
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
    label: "Delete Outbound Shipment",
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

export const columns: ColumnDef<OutboundShipmentResponse>[] = [
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
    accessorKey: "trackingNumber",
    header: "Tracking Number",
    cell: ({ row }) => {
      const tracking = row.getValue("trackingNumber") as string;
      const carrier = row.original.expand?.carrier;
      return (
        <Item size="sm" className="p-0">
          <ItemContent className="gap-0.5">
            <ItemTitle className="font-mono text-sm py-1 rounded">
              {tracking}
            </ItemTitle>
            {carrier && <ItemDescription>{carrier.name}</ItemDescription>}
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {statusBadgeCell(
              row.getValue("status") as string,
              outboundShipmentStatusColors
            )}
          </ItemTitle>
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
