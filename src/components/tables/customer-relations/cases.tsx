import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  casePriorityColors,
  caseStatusColors,
  formatDate,
  formatHyphens,
  statusBadgeCell,
  truncateText,
} from "@/components/utils";
import { CustomerRelationsCasesResponse } from "@/lib/pb.types";

type CaseResponse = CustomerRelationsCasesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<CaseResponse>[] = [
  {
    label: "Edit Case",
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
    label: "Delete Case",
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

export const columns: ColumnDef<CaseResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "caseNumber",
    header: "Case Number",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => formatHyphens(row.getValue("type") as string),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      statusBadgeCell(row.getValue("status") as string, caseStatusColors),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;
      return statusBadgeCell(priority, casePriorityColors);
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) =>
      truncateText(row.getValue("description") as string | undefined),
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("created") as string),
  },
];
