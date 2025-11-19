import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  formatCurrency,
  formatDate,
  formatHyphens,
  opportunityStageColors,
  percentageCell,
  statusBadgeCell,
} from "@/components/utils";
import { CustomerRelationsOpportunitiesResponse } from "@/lib/pb.types";

type OpportunityResponse = CustomerRelationsOpportunitiesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<OpportunityResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Opportunity ID copied to clipboard");
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
    label: "Edit Opportunity",
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
    label: "Delete Opportunity",
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

export const columns: ColumnDef<OpportunityResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Opportunity Name",
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) =>
      statusBadgeCell(
        row.getValue("stage") as string | undefined,
        opportunityStageColors
      ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => formatHyphens(row.getValue("source") as string),
  },
  {
    accessorKey: "dealValue",
    header: "Deal Value",
    cell: ({ row }) =>
      formatCurrency(row.getValue("dealValue") as number | undefined),
  },
  {
    accessorKey: "probability",
    header: "Probability %",
    cell: ({ row }) =>
      percentageCell(row.getValue("probability") as number | undefined),
  },
  {
    accessorKey: "expectedCloseDate",
    header: "Expected Close Date",
    cell: ({ row }) =>
      formatDate(row.getValue("expectedCloseDate") as string | undefined),
  },
  {
    accessorKey: "company",
    header: "Company ID",
  },
  {
    accessorKey: "contact",
    header: "Contact ID",
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
