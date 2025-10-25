import { ColumnDef } from "@tanstack/react-table";
import { TableDisputeQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the dispute type from the TableDisputeQuery
type Dispute = NonNullable<TableDisputeQuery["billing"]>["disputes"][number];

export const columns: ColumnDef<Dispute>[] = [
  {
    header: "Dispute Details",
    columns: [
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "reason",
        header: "Reason",
      },
      {
        accessorKey: "disputedAmount",
        header: "Disputed Amount",
        cell: ({ row }) => {
          const disputedAmount = row.getValue("disputedAmount") as number | null;
          if (disputedAmount === null || disputedAmount === undefined) return "-";
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PHP", // Assuming PHP as default currency
          }).format(disputedAmount);
        },
      },
      {
        accessorKey: "submittedAt",
        header: "Submitted At",
        cell: ({ row }) => {
          const submittedAt = row.getValue("submittedAt") as string | null;
          if (!submittedAt) return "-";
          return format(new Date(Number(submittedAt)), "PPP");
        },
      },
      {
        accessorKey: "resolvedAt",
        header: "Resolved At",
        cell: ({ row }) => {
          const resolvedAt = row.getValue("resolvedAt") as string | null;
          if (!resolvedAt) return "-";
          return format(new Date(Number(resolvedAt)), "PPP");
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
    id: "client",
    header: "Client Information",
    columns: [
      {
        accessorKey: "client.name",
        header: "Name",
        accessorFn: (row) => row.client?.name,
      },
      {
        accessorKey: "client.industry",
        header: "Industry",
        accessorFn: (row) => row.client?.industry,
      },
      {
        accessorKey: "client.phoneNumber",
        header: "Phone Number",
        accessorFn: (row) => row.client?.phoneNumber,
      },
    ],
  },
  {
    id: "resolvedByUser",
    header: "Resolved By",
    columns: [
      {
        accessorKey: "resolvedByUser.name",
        header: "Name",
        accessorFn: (row) => row.resolvedByUser?.name,
      },
      {
        accessorKey: "resolvedByUser.email",
        header: "Email",
        accessorFn: (row) => row.resolvedByUser?.email,
      },
    ],
  },
  {
    id: "lineItem",
    header: "Line Item",
    columns: [
        {
            accessorKey: "lineItem.description",
            header: "Description",
            accessorFn: (row) => row.lineItem?.description,
        },
        {
            accessorKey: "lineItem.quantity",
            header: "Quantity",
            accessorFn: (row) => row.lineItem?.quantity,
        },
        {
            accessorKey: "lineItem.lineTotal",
            header: "Line Total",
            accessorFn: (row) => row.lineItem?.lineTotal,
        },
    ]
  },
  {
    id: "invoice",
    header: "Invoice",
    columns: [
        {
            accessorKey: "lineItem.invoice.invoiceNumber",
            header: "Invoice Number",
            accessorFn: (row) => row.lineItem?.invoice?.invoiceNumber,
        },
        {
            accessorKey: "lineItem.invoice.status",
            header: "Status",
            accessorFn: (row) => row.lineItem?.invoice?.status,
        },
    ]
  }
];
