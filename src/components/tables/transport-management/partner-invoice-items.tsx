import { TransportManagementPartnerInvoiceItemsResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type PartnerInvoiceItemResponse = TransportManagementPartnerInvoiceItemsResponse;

export default [
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
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("created") as string;
      return new Date(date).toLocaleDateString();
    },
  },
  {
    accessorKey: "updated",
    header: "Updated",
    cell: ({ row }) => {
      const date = row.getValue("updated") as string;
      return new Date(date).toLocaleDateString();
    },
  },
] satisfies ColumnDef<PartnerInvoiceItemResponse>[];
