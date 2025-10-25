import { ColumnDef } from "@tanstack/react-table";
import { TableInvoiceQuery } from "@packages/graphql/client/generated/graphql";

// Extract the invoice type from the TableInvoiceQuery
type Invoice = NonNullable<TableInvoiceQuery["crm"]>["invoices"][number];

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const total = row.getValue("total") as number | null;
      if (total === null || total === undefined) return "-";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(total);
    },
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
    cell: ({ row }) => {
      const issueDate = row.getValue("issueDate") as string | null;
      if (!issueDate) return "-";
      return new Date(issueDate).toLocaleDateString();
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const dueDate = row.getValue("dueDate") as string | null;
      if (!dueDate) return "-";
      return new Date(dueDate).toLocaleDateString();
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "opportunity.name",
    header: "Opportunity",
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