import { ColumnDef } from "@tanstack/react-table";
import { TableQuoteQuery } from "@packages/graphql/client/generated/graphql";

// Extract the quote type from the TableQuoteQuery
type Quote = NonNullable<TableQuoteQuery["billing"]>["quotes"][number];

export const columns: ColumnDef<Quote>[] = [
  {
    accessorKey: "quoteNumber",
    header: "Quote Number",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "client.name",
    header: "Client Name",
  },
  {
    accessorKey: "quotedPrice",
    header: "Quoted Price",
    cell: ({ row }) => {
      const quotedPrice = row.getValue("quotedPrice") as number | null;
      if (quotedPrice === null || quotedPrice === undefined) return "-";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP", // Assuming PHP as default currency
      }).format(quotedPrice);
    },
  },
  {
    accessorKey: "serviceLevel",
    header: "Service Level",
  },
  {
    accessorKey: "expiresAt",
    header: "Expires At",
    cell: ({ row }) => {
      const expiresAt = row.getValue("expiresAt") as string | null;
      if (!expiresAt) return "-";
      return new Date(expiresAt).toLocaleDateString();
    },
  },
  {
    accessorKey: "createdByUser.name",
    header: "Created By",
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