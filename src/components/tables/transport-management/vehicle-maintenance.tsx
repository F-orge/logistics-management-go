import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatCurrency, formatDate, truncateText } from "@/components/utils";
import { TransportManagementVehicleMaintenanceResponse } from "@/lib/pb.types";

type VehicleMaintenanceResponse = TransportManagementVehicleMaintenanceResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<VehicleMaintenanceResponse>[] = [
  {
    label: "Edit Vehicle Maintenance",
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
    label: "Delete Vehicle Maintenance",
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

export const columns: ColumnDef<VehicleMaintenanceResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "vehicle",
    header: "Vehicle ID",
  },
  {
    accessorKey: "serviceType",
    header: "Service Type",
  },
  {
    accessorKey: "serviceDate",
    header: "Service Date",
    cell: ({ row }) => formatDate(row.getValue("serviceDate") as string),
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: ({ row }) => {
      const cost = row.getValue("cost") as number | undefined;
      return cost ? formatCurrency(cost) : "-";
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => {
      const notes = row.getValue("notes") as string | undefined;
      return notes ? truncateText(notes, 50) : "-";
    },
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
