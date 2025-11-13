import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatDateTime, geofenceEventTypeCell } from "@/components/utils";
import { TransportManagementGeofenceEventsResponse } from "@/lib/pb.types";

type GeofenceEventResponse = TransportManagementGeofenceEventsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<GeofenceEventResponse>[] = [
  {
    label: "Edit Geofence Event",
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
    label: "Delete Geofence Event",
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

export const columns: ColumnDef<GeofenceEventResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "vehicle",
    header: "Vehicle ID",
  },
  {
    accessorKey: "geofence",
    header: "Geofence ID",
  },
  {
    accessorKey: "type",
    header: "Event Type",
    cell: ({ row }) => geofenceEventTypeCell(row.getValue("type") as string),
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => formatDateTime(row.getValue("timestamp") as string),
  },
];
