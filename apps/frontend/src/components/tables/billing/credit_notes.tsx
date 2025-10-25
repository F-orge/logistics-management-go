import { ColumnDef } from "@tanstack/react-table";
import { TableCreditNoteQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the credit note type from the TableCreditNoteQuery
type CreditNote = NonNullable<TableCreditNoteQuery["billing"]>["creditNotes"][number];

export const columns: ColumnDef<CreditNote>[] = [
  {
    header: "Credit Note Details",
    columns: [
      {
        accessorKey: "creditNoteNumber",
        header: "Credit Note Number",
      },
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
        accessorKey: "reason",
        header: "Reason",
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
        accessorKey: "appliedAt",
        header: "Applied At",
        cell: ({ row }) => {
          const appliedAt = row.getValue("appliedAt") as string | null;
          if (!appliedAt) return "-";
          return format(new Date(Number(appliedAt)), "PPP");
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
    id: "createdByUser",
    header: "Created By",
    columns: [
      {
        accessorKey: "createdByUser.name",
        header: "Name",
        accessorFn: (row) => row.createdByUser?.name,
      },
      {
        accessorKey: "createdByUser.email",
        header: "Email",
        accessorFn: (row) => row.createdByUser?.email,
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
        accessorKey: "invoice.totalAmount",
        header: "Total Amount",
        accessorFn: (row) => row.invoice?.totalAmount,
        cell: ({ row }) => {
            const totalAmount = row.original.invoice?.totalAmount;
            const currency = row.original.invoice?.currency;
            if (totalAmount === null || totalAmount === undefined) return "-";
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: currency || "PHP",
            }).format(totalAmount);
        }
      },
    ],
  },
  {
    id: "dispute",
    header: "Dispute Information",
    columns: [
        {
            accessorKey: "dispute.reason",
            header: "Reason",
            accessorFn: (row) => row.dispute?.reason,
        },
        {
            accessorKey: "dispute.status",
            header: "Status",
            accessorFn: (row) => row.dispute?.status,
        },
        {
            accessorKey: "dispute.disputedAmount",
            header: "Disputed Amount",
            accessorFn: (row) => row.dispute?.disputedAmount,
            cell: ({ row }) => {
                const disputedAmount = row.original.dispute?.disputedAmount;
                if (disputedAmount === null || disputedAmount === undefined) return "-";
                return new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "PHP",
                }).format(disputedAmount);
            }
        },
    ]
  }
];
