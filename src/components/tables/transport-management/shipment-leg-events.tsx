import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  coordinatesCell,
  formatDateTime,
  truncateText,
} from "@/components/utils";
import { TransportManagementShipmentLegEventsResponse } from "@/lib/pb.types";

type ShipmentLegEventResponse = TransportManagementShipmentLegEventsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<ShipmentLegEventResponse>[] = [
  {
    label: "Edit Shipment Leg Event",
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
    label: "Delete Shipment Leg Event",
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

export const columns: ColumnDef<ShipmentLegEventResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "shipmentLegId",
    header: "Shipment Leg ID",
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => truncateText(row.getValue("message") as string, 50),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => coordinatesCell(row.getValue("location")),
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => formatDateTime(row.getValue("timestamp") as string),
  },
];
