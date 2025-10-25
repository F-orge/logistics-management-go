import { ColumnDef } from "@tanstack/react-table";
import { TablePaymentQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the payment type from the TablePaymentQuery
type Payment = NonNullable<TablePaymentQuery["billing"]>["payments"][number];

export const columns: ColumnDef<Payment>[] = [
  {
    header: "Payment Details",
    columns: [
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
          const amount = row.getValue("amount") as number | null;
          const currency = row.original.currency;
          if (amount === null || amount === undefined) return "-";
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency || "PHP",
          }).format(amount);
        },
      },
      {
        accessorKey: "fees",
        header: "Fees",
        cell: ({ row }) => {
          const fees = row.getValue("fees") as number | null;
          const currency = row.original.currency;
          if (fees === null || fees === undefined) return "-";
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency || "PHP",
          }).format(fees);
        },
      },
      {
        accessorKey: "gatewayReference",
        header: "Gateway Reference",
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
    id: "invoice",
    header: "Invoice Information",
    columns: [
      {
        accessorKey: "invoice.invoiceNumber",
        header: "Invoice Number",
        accessorFn: (row) => row.invoice?.invoiceNumber,
      },
      {
        accessorKey: "invoice.status",
        header: "Status",
        accessorFn: (row) => row.invoice?.status,
      },
      {
        accessorKey: "invoice.amountPaid",
        header: "Amount Paid",
        accessorFn: (row) => row.invoice?.amountPaid,
      },
    ],
  },
  {
    id: "processedByUser",
    header: "Processed By",
    columns: [
      {
        accessorKey: "processedByUser.name",
        header: "Name",
        accessorFn: (row) => row.processedByUser?.name,
      },
      {
        accessorKey: "processedByUser.email",
        header: "Email",
        accessorFn: (row) => row.processedByUser?.email,
      },
    ],
  },
];
