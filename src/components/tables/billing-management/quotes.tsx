import { BillingManagementQuotesResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type QuoteResponse = BillingManagementQuotesResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "quoteNumber",
    header: "Quote #",
  },
  {
    accessorKey: "client",
    header: "Client ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string | undefined;
      const colors: Record<string, string> = {
        pending: "bg-yellow-100 text-yellow-800",
        accepted: "bg-green-100 text-green-800",
        expired: "bg-red-100 text-red-800",
        cancelled: "bg-gray-100 text-gray-800",
        converted: "bg-blue-100 text-blue-800",
      };
      return (
        <span className={`px-2 py-1 rounded text-sm ${colors[status || ""] || ""}`}>
          {status ? status.replace(/-/g, " ") : "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "quotePrice",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("quotePrice") as number | undefined;
      return price
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)
        : "-";
    },
  },
  {
    accessorKey: "serviceLevel",
    header: "Service Level",
  },
  {
    accessorKey: "originDetails",
    header: "Origin",
    cell: ({ row }) => {
      const origin = row.getValue("originDetails") as string | undefined;
      return origin ? origin.substring(0, 40) + "..." : "-";
    },
  },
  {
    accessorKey: "destinationDetails",
    header: "Destination",
    cell: ({ row }) => {
      const dest = row.getValue("destinationDetails") as string | undefined;
      return dest ? dest.substring(0, 40) + "..." : "-";
    },
  },
  {
    accessorKey: "weight",
    header: "Weight (kg)",
  },
  {
    accessorKey: "length",
    header: "Length (cm)",
  },
  {
    accessorKey: "width",
    header: "Width (cm)",
  },
  {
    accessorKey: "height",
    header: "Height (cm)",
  },
  {
    accessorKey: "expiredAt",
    header: "Expires At",
    cell: ({ row }) => {
      const date = row.getValue("expiredAt") as string | undefined;
      if (!date) return "-";
      const expDate = new Date(date);
      const today = new Date();
      const isExpired = expDate < today;
      return (
        <span className={isExpired ? "text-red-600 font-semibold" : ""}>
          {expDate.toLocaleDateString()}
        </span>
      );
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
] satisfies ColumnDef<QuoteResponse>[];
