import { ColumnDef } from "@tanstack/react-table";
import { TableInvoiceQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the invoice type from the TableInvoiceQuery
type Invoice = NonNullable<TableInvoiceQuery["crm"]>["invoices"][number];

export const columns: ColumnDef<Invoice>[] = [
  {
    header: "Invoice Details",
    columns: [
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
        accessorKey: "paymentMethod",
        header: "Payment Method",
      },
      {
        accessorKey: "issueDate",
        header: "Issue Date",
        cell: ({ row }) => {
          const issueDate = row.getValue("issueDate") as string | null;
          if (!issueDate) return "-";
          return format(new Date(Number(issueDate)), "PPP");
        },
      },
      {
        accessorKey: "dueDate",
        header: "Due Date",
        cell: ({ row }) => {
          const dueDate = row.getValue("dueDate") as string | null;
          if (!dueDate) return "-";
          return format(new Date(Number(dueDate)), "PPP");
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
          const createdAt = row.getValue("createdAt") as string | null;
          if (!createdAt) return "-";
          return format(new Date(Number(createdAt)), "PPP");
        },
      },
    ],
  },
  {
    id: "opportunity",
    header: "Opportunity Information",
    columns: [
      {
        accessorKey: "opportunity.name",
        header: "Name",
        accessorFn: (row) => row.opportunity?.name,
      },
      {
        accessorKey: "opportunity.stage",
        header: "Stage",
        accessorFn: (row) => row.opportunity?.stage,
      },
      {
        accessorKey: "opportunity.dealValue",
        header: "Deal Value",
        accessorFn: (row) => row.opportunity?.dealValue,
        cell: ({ row }) => {
          const dealValue = row.original.opportunity?.dealValue;
          if (dealValue === null || dealValue === undefined) return "-";
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PHP",
          }).format(dealValue);
        },
      },
      {
        accessorKey: "opportunity.expectedCloseDate",
        header: "Expected Close Date",
        accessorFn: (row) => row.opportunity?.expectedCloseDate,
        cell: ({ row }) => {
          const expectedCloseDate = row.original.opportunity?.expectedCloseDate;
          if (!expectedCloseDate) return "-";
          return format(new Date(Number(expectedCloseDate)), "PPP");
        },
      },
    ],
  },
];