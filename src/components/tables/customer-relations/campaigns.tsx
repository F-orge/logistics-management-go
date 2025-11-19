import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatCurrency, formatDate } from "@/components/utils";
import { CustomerRelationsCampaignsResponse } from "@/lib/pb.types";

type CampaignResponse = CustomerRelationsCampaignsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<CampaignResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Campaign ID copied to clipboard");
    },
    divider: true,
  },
  {
    label: "Edit Campaign",
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
    label: "Delete Campaign",
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

export const columns: ColumnDef<CampaignResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Campaign Name",
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => formatCurrency(row.getValue("budget") as number),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) =>
      formatDate(row.getValue("startDate") as string | undefined),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) =>
      formatDate(row.getValue("endDate") as string | undefined),
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
