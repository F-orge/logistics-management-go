import { ColumnDef } from "@tanstack/react-table";
import { TableCreditNoteQuery } from "@packages/graphql/client/generated/graphql";

// Extract the credit note type from the TableCreditNoteQuery
type CreditNote = NonNullable<TableCreditNoteQuery["billing"]>["creditNotes"][number];

export const columns: ColumnDef<CreditNote>[] = [
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
      return new Date(issueDate).toLocaleDateString();
    },
  },
  {
    accessorKey: "appliedAt",
    header: "Applied At",
    cell: ({ row }) => {
      const appliedAt = row.getValue("appliedAt") as string | null;
      if (!appliedAt) return "-";
      return new Date(appliedAt).toLocaleDateString();
    },
  },
  {
    accessorKey: "createdByUser.name",
    header: "Created By",
  },
  {
    accessorKey: "invoice.invoiceNumber",
    header: "Invoice Number",
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