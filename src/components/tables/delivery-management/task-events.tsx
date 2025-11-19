import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash, View } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  coordinatesCell,
  formatDateTime,
  formatHyphens,
  statusBadgeCell,
  taskEventStatusColors,
  truncateText,
} from "@/components/utils";
import { DeliveryManagementTaskEventsResponse } from "@/lib/pb.types";

type TaskEventResponse = DeliveryManagementTaskEventsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<TaskEventResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Task Event ID copied to clipboard");
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
    label: "Edit Task Event",
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
    label: "Delete Task Event",
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

export const columns: ColumnDef<TaskEventResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "task",
    header: "Task ID",
  },
  {
    accessorKey: "status",
    header: "Event Status",
    cell: ({ row }) =>
      statusBadgeCell(row.getValue("status") as string, taskEventStatusColors),
  },
  {
    accessorKey: "coordinates",
    header: "Location",
    cell: ({ row }) =>
      coordinatesCell(
        row.getValue("coordinates") as { lon: number; lat: number } | undefined
      ),
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) =>
      truncateText(row.getValue("notes") as string | undefined, 40),
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) =>
      truncateText(row.getValue("reason") as string | undefined, 40),
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => formatDateTime(row.getValue("timestamp") as string),
  },
];
