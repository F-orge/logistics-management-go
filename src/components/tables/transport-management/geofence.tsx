import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatCoordinates, formatDate } from "@/components/utils";
import { TransportManagementGeofenceResponse } from "@/lib/pb.types";

type GeofenceResponse = TransportManagementGeofenceResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<GeofenceResponse>[] = [
  {
    label: "Edit Geofence",
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
    label: "Delete Geofence",
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

export const columns: ColumnDef<GeofenceResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Geofence Name",
  },
  {
    accessorKey: "coordinates",
    header: "Coordinates",
    cell: ({ row }) =>
      formatCoordinates(
        row.getValue("coordinates") as { lon: number; lat: number } | undefined
      ),
  },
  {
    accessorKey: "radius",
    header: "Radius (m)",
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
