import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { DeliveryManagementTaskEventsResponse } from "@/lib/pb.types";
import { formatDateTime, formatHyphens, truncateText, coordinatesCell, taskEventStatusColors, statusBadgeCell } from "@/components/utils";

type TaskEventResponse = DeliveryManagementTaskEventsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<TaskEventResponse>[] = [
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
    cell: ({ row }) => statusBadgeCell(row.getValue("status") as string, taskEventStatusColors),
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
    cell: ({ row }) => truncateText(row.getValue("notes") as string | undefined, 40),
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => truncateText(row.getValue("reason") as string | undefined, 40),
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => formatDateTime(row.getValue("timestamp") as string),
  },
];
