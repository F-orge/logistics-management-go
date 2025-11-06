import { BillingManagementLogsResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type LogResponse = BillingManagementLogsResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "externalSystem",
    header: "External System",
  },
  {
    accessorKey: "recordType",
    header: "Record Type",
  },
  {
    accessorKey: "recordId",
    header: "Record ID",
  },
  {
    accessorKey: "externalId",
    header: "External ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string | undefined;
      const colors: Record<string, string> = {
        pending: "bg-yellow-100 text-yellow-800",
        "in-progress": "bg-blue-100 text-blue-800",
        success: "bg-green-100 text-green-800",
        failed: "bg-red-100 text-red-800",
        retry: "bg-orange-100 text-orange-800",
      };
      return (
        <span className={`px-2 py-1 rounded text-sm ${colors[status || ""] || ""}`}>
          {status ? status.replace(/-/g, " ") : "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "retryCount",
    header: "Retry Count",
  },
  {
    accessorKey: "errorMessage",
    header: "Error",
    cell: ({ row }) => {
      const error = row.getValue("errorMessage") as string | undefined;
      return error ? error.substring(0, 40) + "..." : "-";
    },
  },
  {
    accessorKey: "lastSyncAt",
    header: "Last Sync",
    cell: ({ row }) => {
      const date = row.getValue("lastSyncAt") as string | undefined;
      return date ? new Date(date).toLocaleString() : "-";
    },
  },
  {
    accessorKey: "nextRetryAt",
    header: "Next Retry",
    cell: ({ row }) => {
      const date = row.getValue("nextRetryAt") as string | undefined;
      return date ? new Date(date).toLocaleString() : "-";
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("created") as string;
      return new Date(date).toLocaleString();
    },
  },
] satisfies ColumnDef<LogResponse>[];
