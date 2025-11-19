import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  formatDate,
  formatDateTime,
  formatHyphens,
  routeStatusColors,
  statusBadgeCell,
} from "@/components/utils";
import { DeliveryManagementRoutesResponse } from "@/lib/pb.types";

type RouteResponse = DeliveryManagementRoutesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<RouteResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Route ID copied to clipboard");
    },
    divider: true,
  },
  {
    label: "Edit Route",
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
    label: "Delete Route",
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

export const columns: ColumnDef<RouteResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "driver",
    header: "Driver ID",
  },
  {
    accessorKey: "routeDate",
    header: "Route Date",
    cell: ({ row }) =>
      formatDate(row.getValue("routeDate") as string | undefined),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      statusBadgeCell(
        row.getValue("status") as string | undefined,
        routeStatusColors
      ),
  },
  {
    accessorKey: "totalDistance",
    header: "Distance (km)",
  },
  {
    accessorKey: "estimatedDurationInMinutes",
    header: "Est. Duration (min)",
  },
  {
    accessorKey: "startedAt",
    header: "Started At",
    cell: ({ row }) =>
      formatDateTime(row.getValue("startedAt") as string | undefined),
  },
  {
    accessorKey: "completedAt",
    header: "Completed At",
    cell: ({ row }) =>
      formatDateTime(row.getValue("completedAt") as string | undefined),
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("created") as string),
  },
];
