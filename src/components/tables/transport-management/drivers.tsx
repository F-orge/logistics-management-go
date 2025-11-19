import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  driverStatusColors,
  expiryDateCell,
  formatDate,
  statusBadgeCell,
} from "@/components/utils";
import { TransportManagementDriversResponse } from "@/lib/pb.types";

type DriverResponse = TransportManagementDriversResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<DriverResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Driver ID copied to clipboard");
    },
    divider: true,
  },
  {
    label: "Edit Driver",
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
    label: "Delete Driver",
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

export const columns: ColumnDef<DriverResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "user",
    header: "User ID",
  },
  {
    accessorKey: "licenseNumber",
    header: "License Number",
  },
  {
    accessorKey: "licenseExpiryDate",
    header: "License Expiry",
    cell: ({ row }) =>
      expiryDateCell(row.getValue("licenseExpiryDate") as string | undefined),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      statusBadgeCell(row.getValue("status") as string, driverStatusColors),
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
