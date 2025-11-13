import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatCoordinates, formatDateTime } from "@/components/utils";
import { TransportManagementGpsPingsResponse } from "@/lib/pb.types";

type GpsPingResponse = TransportManagementGpsPingsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<GpsPingResponse>[] = [
  {
    label: "Edit GPS Ping",
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
    label: "Delete GPS Ping",
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

export const columns: ColumnDef<GpsPingResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "vehicle",
    header: "Vehicle ID",
  },
  {
    accessorKey: "coordinates",
    header: "Location",
    cell: ({ row }) =>
      formatCoordinates(
        row.getValue("coordinates") as { lon: number; lat: number } | undefined
      ),
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => formatDateTime(row.getValue("timestamp") as string),
  },
];
