import { ColumnDef } from "@tanstack/react-table";
import { TableTaskQuery } from "@packages/graphql/client/generated/graphql";

// Extract the task type from the TableTaskQuery
type Task = NonNullable<TableTaskQuery["wms"]>["tasks"][number];

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "taskNumber",
    header: "Task Number",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "user.name",
    header: "Assigned To",
  },
  {
    accessorKey: "warehouse.name",
    header: "Warehouse",
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({ row }) => {
      const startTime = row.getValue("startTime") as string | null;
      if (!startTime) return "-";
      return new Date(startTime).toLocaleString();
    },
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    cell: ({ row }) => {
      const endTime = row.getValue("endTime") as string | null;
      if (!endTime) return "-";
      return new Date(endTime).toLocaleString();
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