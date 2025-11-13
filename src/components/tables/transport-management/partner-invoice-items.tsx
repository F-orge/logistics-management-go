import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatCurrency, formatDate } from "@/components/utils";
import { TransportManagementPartnerInvoiceItemsResponse } from "@/lib/pb.types";

type PartnerInvoiceItemResponse =
  TransportManagementPartnerInvoiceItemsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<PartnerInvoiceItemResponse>[] = [
  {
    label: "Edit Partner Invoice Item",
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
    label: "Delete Partner Invoice Item",
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

export const columns: ColumnDef<PartnerInvoiceItemResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "partnerInvoice",
    header: "Invoice ID",
  },
  {
    accessorKey: "shipmentLeg",
    header: "Shipment Leg ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => formatCurrency(row.getValue("amount") as number),
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
