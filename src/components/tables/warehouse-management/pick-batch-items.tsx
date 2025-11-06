import { WarehouseManagementPickBatchItemsResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type PickBatchItemResponse = WarehouseManagementPickBatchItemsResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "pickBatch",
    header: "Pick Batch ID",
  },
  {
    accessorKey: "salesOrder",
    header: "Sales Order ID",
  },
  {
    accessorKey: "orderPriority",
    header: "Order Priority",
  },
  {
    accessorKey: "estimatedPickTime",
    header: "Estimated Pick Time",
    cell: ({ row }) => {
      const date = row.getValue("estimatedPickTime") as string | undefined;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },
  {
    accessorKey: "actualPickTime",
    header: "Actual Pick Time (min)",
    cell: ({ row }) => {
      const time = row.getValue("actualPickTime") as number | undefined;
      return time ? `${time} min` : "-";
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
  {
    accessorKey: "updated",
    header: "Updated",
    cell: ({ row }) => {
      const date = row.getValue("updated") as string;
      return new Date(date).toLocaleDateString();
    },
  },
] satisfies ColumnDef<PickBatchItemResponse>[];
