import { ColumnDef } from "@tanstack/react-table";
import { TableQuoteQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the quote type from the TableQuoteQuery
type Quote = NonNullable<TableQuoteQuery["billing"]>["quotes"][number];

export const columns: ColumnDef<Quote>[] = [
  {
    header: "Quote Details",
    columns: [
      {
        accessorKey: "quoteNumber",
        header: "Quote Number",
      },
      {
        accessorKey: "status",
        header: "Status",
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
          return format(new Date(Number(expiresAt)), "PPP");
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
];
