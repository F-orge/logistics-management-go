import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.billing.shape.accountingSyncLogs>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "errorMessage",
    header: "Error Message",
  },
  {
    accessorKey: "externalId",
    header: "External ID",
  },
  {
    accessorKey: "externalSystem",
    header: "External System",
  },
  {
    accessorKey: "lastSyncAt",
    header: "Last Sync At",
  },
  {
    accessorKey: "nextRetryAt",
    header: "Next Retry At",
  },
  {
    accessorKey: "recordId",
    header: "Record ID",
  },
  {
    accessorKey: "recordType",
    header: "Record Type",
  },
  {
    accessorKey: "requestPayload",
    header: "Request Payload",
  },
  {
    accessorKey: "responsePayload",
    header: "Response Payload",
  },
  {
    accessorKey: "retryCount",
    header: "Retry Count",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
