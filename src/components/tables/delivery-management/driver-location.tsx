import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { DeliveryManagementDriverLocationResponse } from "@/lib/pb.types";
import { formatDateTime, coordinatesCell } from "@/components/utils";

type DriverLocationResponse = DeliveryManagementDriverLocationResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<DriverLocationResponse>[] = [
  {
    label: "Edit Driver Location",
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
    label: "Delete Driver Location",
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

export const columns: ColumnDef<DriverLocationResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "driver",
    header: "Driver ID",
  },
  {
    accessorKey: "coordinates",
    header: "Current Location",
    cell: ({ row }) =>
      coordinatesCell(row.getValue("coordinates") as { lon: number; lat: number }),
  },
  {
    accessorKey: "heading",
    header: "Heading",
    cell: ({ row }) => {
      const heading = row.getValue("heading") as { lon: number; lat: number };
      return `${heading.lat.toFixed(2)}°`;
    },
  },
  {
    accessorKey: "timestamp",
    header: "Updated",
    cell: ({ row }) => formatDateTime(row.getValue("timestamp") as string),
  },
];
