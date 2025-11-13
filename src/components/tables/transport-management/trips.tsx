import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  formatDate,
  statusBadgeCell,
  tripStatusColors,
} from "@/components/utils";
import { TransportManagementTripsResponse } from "@/lib/pb.types";

type TripResponse = TransportManagementTripsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<TripResponse>[] = [
  {
    label: "Edit Trip",
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
    label: "Delete Trip",
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

export const columns: ColumnDef<TripResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "driver",
    header: "Driver ID",
  },
  {
    accessorKey: "vehicle",
    header: "Vehicle ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      statusBadgeCell(row.getValue("status") as string, tripStatusColors),
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
