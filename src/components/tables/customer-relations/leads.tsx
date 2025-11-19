import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash, View } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  emailCell,
  formatDate,
  formatHyphens,
  leadStatusColors,
  statusBadgeCell,
} from "@/components/utils";
import { CustomerRelationsLeadsResponse } from "@/lib/pb.types";

type LeadResponse = CustomerRelationsLeadsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<LeadResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Lead ID copied to clipboard");
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
    label: "Edit Lead",
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
    label: "Delete Lead",
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

export const columns: ColumnDef<LeadResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Lead Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => emailCell(row.getValue("email") as string | undefined),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      statusBadgeCell(
        row.getValue("status") as string | undefined,
        leadStatusColors
      ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) =>
      formatHyphens(row.getValue("source") as string | undefined),
  },
  {
    accessorKey: "score",
    header: "Score",
  },
  {
    accessorKey: "convertedAt",
    header: "Converted At",
    cell: ({ row }) =>
      formatDate(row.getValue("convertedAt") as string | undefined),
  },
  {
    accessorKey: "campaign",
    header: "Campaign ID",
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("created") as string),
  },
];
