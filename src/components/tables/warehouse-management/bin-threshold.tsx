import { WarehouseManagementBinThresholdResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type BinThresholdResponse = WarehouseManagementBinThresholdResponse;

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
    accessorKey: "location",
    header: "Location ID",
  },
  {
    accessorKey: "minQuantity",
    header: "Min Quantity",
  },
  {
    accessorKey: "maxQuantity",
    header: "Max Quantity",
  },
  {
    accessorKey: "reorderQuantity",
    header: "Reorder Quantity",
  },
  {
    accessorKey: "alertThreshold",
    header: "Alert Threshold",
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean | undefined;
      return isActive ? (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
          Active
        </span>
      ) : (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
          Inactive
        </span>
      );
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
] satisfies ColumnDef<BinThresholdResponse>[];
