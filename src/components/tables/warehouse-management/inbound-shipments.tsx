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
  inboundShipmentStatusColors,
  statusBadgeCell,
} from "@/components/utils";
import {
  CustomerRelationsCompaniesResponse,
  WarehouseManagementInboundShipmentsResponse,
  WarehouseManagementWarehousesResponse,
} from "@/lib/pb.types";

type InboundShipmentResponse = WarehouseManagementInboundShipmentsResponse<{
  warehouse: WarehouseManagementWarehousesResponse;
  client: CustomerRelationsCompaniesResponse;
}>;

export const options: RecordListOptions = {
  expand: "warehouse,client",
};

export const actions: ContextMenuItem<InboundShipmentResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Inbound Shipment ID copied to clipboard");
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
    label: "Edit Inbound Shipment",
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
    label: "Delete Inbound Shipment",
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

export const columns: ColumnDef<InboundShipmentResponse>[] = [
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
    accessorKey: "client",
    header: "Client",
    cell: ({ row }) => {
      const client = row.original.expand?.client;
      return (
        <Item size="sm" className="p-0">
          <ItemContent className="gap-0.5">
            <ItemTitle>{client?.name ?? "-"}</ItemTitle>
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
              inboundShipmentStatusColors
            )}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "expectedArrivalDate",
    header: "Expected Arrival",
    cell: ({ row }) => {
      const expected = row.getValue("expectedArrivalDate") as
        | string
        | undefined;
      const actual = row.original.actualArrivalDate;
      return (
        <Item size="sm" className="p-0">
          <ItemContent className="gap-0.5">
            <ItemTitle>{expected ? formatDate(expected) : "-"}</ItemTitle>
            {actual && (
              <ItemDescription>Arrived: {formatDate(actual)}</ItemDescription>
            )}
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
