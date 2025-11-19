import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  formatCurrency,
  formatDate,
  formatHyphens,
  invoiceStatusColors,
  statusBadgeCell,
} from "@/components/utils";
import { CustomerRelationsInvoicesResponse } from "@/lib/pb.types";

type InvoiceResponse = CustomerRelationsInvoicesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<InvoiceResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Invoice ID copied to clipboard");
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
    label: "Edit Invoice",
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
    label: "Delete Invoice",
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

export const columns: ColumnDef<InvoiceResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      statusBadgeCell(
        row.getValue("status") as string | undefined,
        invoiceStatusColors
      ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) =>
      formatCurrency(row.getValue("total") as number | undefined),
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
    cell: ({ row }) =>
      formatDate(row.getValue("issueDate") as string | undefined),
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) =>
      formatDate(row.getValue("dueDate") as string | undefined),
  },
  {
    accessorKey: "paidAt",
    header: "Paid At",
    cell: ({ row }) => formatDate(row.getValue("paidAt") as string | undefined),
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) =>
      formatHyphens(row.getValue("paymentMethod") as string | undefined),
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("created") as string),
  },
];
