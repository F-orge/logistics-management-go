import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash, View } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  formatCurrency,
  formatDate,
  formatHyphens,
  invoiceStatusColors,
  statusBadgeCell,
} from "@/components/utils";
import {
  CustomerRelationsInvoicesResponse,
  CustomerRelationsOpportunitiesResponse,
} from "@/lib/pb.types";

type InvoiceResponse = CustomerRelationsInvoicesResponse<{
  opportunity?: CustomerRelationsOpportunitiesResponse;
}>;

export const options: RecordListOptions = { expand: "opportunity" };

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
    label: "View Record",
    icon: <View />,
    onSelect: (row, navigate) =>
      navigate({
        search: (prev) => ({ ...prev, action: "view", id: row.original.id }),
      }),
  },
  {
    label: "Edit Record",
    icon: <EditIcon />,
    onSelect: (row, navigate) =>
      navigate({
        search: (prev) => ({ ...prev, action: "update", id: row.original.id }),
      }),
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
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>{row.getValue("invoiceNumber")}</ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {statusBadgeCell(
              row.getValue("status") as string | undefined,
              invoiceStatusColors
            )}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {formatCurrency(row.getValue("total") as number | undefined)}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {formatDate(row.getValue("issueDate") as string | undefined)}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {formatDate(row.getValue("dueDate") as string | undefined)}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "paidAt",
    header: "Paid At",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {formatDate(row.getValue("paidAt") as string | undefined)}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {formatHyphens(row.getValue("paymentMethod") as string | undefined)}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "opportunity",
    header: "Opportunity",
    cell: ({ row }) => {
      const opportunity = row.original.expand?.opportunity as
        | CustomerRelationsOpportunitiesResponse
        | undefined;
      if (!opportunity) return "-";
      return (
        <a
          href={`/dashboard/customer-relations/opportunities?action=view&id=${opportunity.id}`}
          className="hover:underline"
        >
          <Item size="sm" className="p-0">
            <ItemContent className="gap-0.5">
              <ItemTitle>{opportunity.name}</ItemTitle>
            </ItemContent>
          </Item>
        </a>
      );
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>{formatDate(row.getValue("created") as string)}</ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
];
