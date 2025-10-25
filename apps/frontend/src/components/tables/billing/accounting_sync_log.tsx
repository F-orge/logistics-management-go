import { ColumnDef } from "@tanstack/react-table";
import { AccountingSyncLogsQuery } from "@packages/graphql/client/generated/graphql";

// Extract the accounting sync log type from the AccountingSyncLogsQuery
type AccountingSyncLog = NonNullable<AccountingSyncLogsQuery["billing"]>["accountingSyncLogs"][number];

export const columns: ColumnDef<AccountingSyncLog>[] = [
  {
    accessorKey: "status",
    header: "Status",
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
    accessorKey: "externalSystem",
    header: "External System",
  },
  {
    accessorKey: "externalId",
    header: "External ID",
  },
  {
    accessorKey: "lastSyncAt",
    header: "Last Sync At",
    cell: ({ row }) => {
      const lastSyncAt = row.getValue("lastSyncAt") as string | null;
      if (!lastSyncAt) return "-";
      return new Date(lastSyncAt).toLocaleString();
    },
  },
  {
    accessorKey: "nextRetryAt",
    header: "Next Retry At",
    cell: ({ row }) => {
      const nextRetryAt = row.getValue("nextRetryAt") as string | null;
      if (!nextRetryAt) return "-";
      return new Date(nextRetryAt).toLocaleString();
    },
  },
  {
    accessorKey: "retryCount",
    header: "Retry Count",
  },
  {
    accessorKey: "errorMessage",
    header: "Error Message",
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