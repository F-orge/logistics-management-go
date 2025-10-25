import { ColumnDef } from "@tanstack/react-table";
import { TablePartnerInvoiceQuery } from "@packages/graphql/client/generated/graphql";

// Extract the partner invoice type from the TablePartnerInvoice
type PartnerInvoice = NonNullable<
  TablePartnerInvoiceQuery["tms"]
>["partnerInvoices"][number];

export const columns: ColumnDef<PartnerInvoice>[] = [
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const totalAmount = row.getValue("totalAmount") as number | null;
      if (totalAmount === null || totalAmount === undefined) return "-";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(totalAmount);
    },
  },
  {
    accessorKey: "invoiceDate",
    header: "Invoice Date",
    cell: ({ row }) => {
      const invoiceDate = row.getValue("invoiceDate") as string | null;
      if (!invoiceDate) return "-";
      return new Date(invoiceDate).toLocaleDateString();
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string | null;
      if (!createdAt) return "-";
      return new Date(createdAt).toLocaleDateString();
    },
  },
];
