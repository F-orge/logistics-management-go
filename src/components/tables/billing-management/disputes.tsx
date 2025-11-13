import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  disputeStatusColors,
  formatCurrency,
  formatDate,
  statusBadgeCell,
  truncateText,
} from "@/components/utils";
import { BillingManagementDisputesResponse } from "@/lib/pb.types";

type DisputeResponse = BillingManagementDisputesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<DisputeResponse>[] = [
  {
    label: "Edit Dispute",
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
    label: "Delete Dispute",
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

export const columns: ColumnDef<DisputeResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "client",
    header: "Client ID",
  },
  {
    accessorKey: "lineItem",
    header: "Line Item ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      statusBadgeCell(row.getValue("status") as string, disputeStatusColors),
  },
  {
    accessorKey: "disputeAmount",
    header: "Dispute Amount",
    cell: ({ row }) => formatCurrency(row.getValue("disputeAmount") as number),
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => truncateText(row.getValue("reason") as string, 50),
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted At",
    cell: ({ row }) => formatDate(row.getValue("submittedAt") as string),
  },
  {
    accessorKey: "resolvedBy",
    header: "Resolved By",
  },
  {
    accessorKey: "resolvedAt",
    header: "Resolved At",
    cell: ({ row }) => formatDate(row.getValue("resolvedAt") as string),
  },
  {
    accessorKey: "resolutionNotes",
    header: "Resolution Notes",
    cell: ({ row }) =>
      truncateText(row.getValue("resolutionNotes") as string, 50),
  },
];
