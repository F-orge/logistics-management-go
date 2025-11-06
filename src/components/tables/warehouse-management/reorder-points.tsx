import { WarehouseManagementReorderPointsResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type ReorderPointResponse = WarehouseManagementReorderPointsResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "product",
    header: "Product ID",
  },
  {
    accessorKey: "warehouse",
    header: "Warehouse ID",
  },
  {
    accessorKey: "threshold",
    header: "Threshold Quantity",
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
] satisfies ColumnDef<ReorderPointResponse>[];
