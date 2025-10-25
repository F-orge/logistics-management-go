import { ColumnDef } from "@tanstack/react-table";
import { TablePickBatchQuery } from "@packages/graphql/client/generated/graphql";

// Extract the pick batch type from the TablePickBatchQuery
type PickBatch = NonNullable<TablePickBatchQuery["wms"]>["pickBatches"][number];

export const columns: ColumnDef<PickBatch>[] = [
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
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
    accessorKey: "strategy",
    header: "Strategy",
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
    header: "Estimated Duration",
  },
  {
    accessorKey: "actualDuration",
    header: "Actual Duration",
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