import { ColumnDef } from "@tanstack/react-table";
import { TableTaskEventQuery } from "@packages/graphql/client/generated/graphql";

// Extract the task event type from the TableTaskEventQuery
type TaskEvent = NonNullable<TableTaskEventQuery["dms"]>["taskEvents"][number];

export const columns: ColumnDef<TaskEvent>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "deliveryTask.recipientName",
    header: "Recipient Name",
  },
  {
    accessorKey: "deliveryTask.package.packageNumber",
    header: "Package Number",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
      const timestamp = row.getValue("timestamp") as string | null;
      if (!timestamp) return "-";
      return new Date(timestamp).toLocaleString();
    },
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