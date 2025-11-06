import { WarehouseManagementPickBatchesResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type PickBatchResponse = WarehouseManagementPickBatchesResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
  },
  {
    accessorKey: "warehouse",
    header: "Warehouse ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string | undefined;
      const colors: Record<string, string> = {
        pending: "bg-yellow-100 text-yellow-800",
        "in-progress": "bg-blue-100 text-blue-800",
        completed: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
      };
      return (
        <span className={`px-2 py-1 rounded text-sm ${colors[status || ""] || ""}`}>
          {status || "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "strategy",
    header: "Strategy",
    cell: ({ row }) => {
      const strategy = row.getValue("strategy") as string | undefined;
      return strategy ? strategy.replace(/-/g, " ") : "-";
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "totalItems",
    header: "Total Items",
  },
  {
    accessorKey: "completedItems",
    header: "Completed Items",
  },
  {
    accessorKey: "estimatedDuration",
    header: "Estimated (min)",
    cell: ({ row }) => {
      const duration = row.getValue("estimatedDuration") as number | undefined;
      return duration ? `${duration}` : "-";
    },
  },
  {
    accessorKey: "actualDuration",
    header: "Actual (min)",
    cell: ({ row }) => {
      const duration = row.getValue("actualDuration") as number | undefined;
      return duration ? `${duration}` : "-";
    },
  },
  {
    accessorKey: "startedAt",
    header: "Started At",
    cell: ({ row }) => {
      const date = row.getValue("startedAt") as string | undefined;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },
  {
    accessorKey: "completedAt",
    header: "Completed At",
    cell: ({ row }) => {
      const date = row.getValue("completedAt") as string | undefined;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },
] satisfies ColumnDef<PickBatchResponse>[];
