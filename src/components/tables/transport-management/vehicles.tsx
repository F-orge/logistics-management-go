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
  registrationNumberCell,
  statusBadgeCell,
  vehicleStatusColors,
} from "@/components/utils";
import { TransportManagementVehiclesResponse } from "@/lib/pb.types";

type VehicleResponse = TransportManagementVehiclesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<VehicleResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Vehicle ID copied to clipboard");
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
    label: "Edit Vehicle",
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
    label: "Delete Vehicle",
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

export const columns: ColumnDef<VehicleResponse>[] = [
  {
    accessorKey: "registrationNumber",
    header: "Registration Number",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {registrationNumberCell(
              row.getValue("registrationNumber") as string
            )}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>{row.getValue("model") as string}</ItemTitle>
          <ItemDescription>
            Weight: {row.original.capacityWeight ?? "-"} kg | Volume:{" "}
            {row.original.capacityVolume ?? "-"} m³
          </ItemDescription>
        </ItemContent>
      </Item>
    ),
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
              vehicleStatusColors
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
