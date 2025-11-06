import { BillingManagementDisputesResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type DisputeResponse = BillingManagementDisputesResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "client",
    header: "Client ID",
  },
  {
    accessorKey: "lineItem",
    header: "Line Item ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const colors: Record<string, string> = {
        open: "bg-yellow-100 text-yellow-800",
        "under-review": "bg-blue-100 text-blue-800",
        approved: "bg-green-100 text-green-800",
        denied: "bg-red-100 text-red-800",
        escalated: "bg-red-100 text-red-800",
        closed: "bg-gray-100 text-gray-800",
      };
      return (
        <span className={`px-2 py-1 rounded text-sm ${colors[status] || ""}`}>
          {status.replace(/-/g, " ")}
        </span>
      );
    },
  },
  {
    accessorKey: "disputeAmount",
    header: "Dispute Amount",
    cell: ({ row }) => {
      const amount = row.getValue("disputeAmount") as number | undefined;
      return amount
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)
        : "-";
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
      const reason = row.getValue("reason") as string;
      return reason.substring(0, 50) + (reason.length > 50 ? "..." : "");
    },
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted At",
    cell: ({ row }) => {
      const date = row.getValue("submittedAt") as string | undefined;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },
  {
    accessorKey: "resolvedBy",
    header: "Resolved By",
  },
  {
    accessorKey: "resolvedAt",
    header: "Resolved At",
    cell: ({ row }) => {
      const date = row.getValue("resolvedAt") as string | undefined;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },
  {
    accessorKey: "resolutionNotes",
    header: "Resolution Notes",
    cell: ({ row }) => {
      const notes = row.getValue("resolutionNotes") as string | undefined;
      return notes ? notes.substring(0, 50) + "..." : "-";
    },
  },
] satisfies ColumnDef<DisputeResponse>[];
