import { WarehouseManagementInventoryAdjustmentResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type InventoryAdjustmentResponse = WarehouseManagementInventoryAdjustmentResponse;

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
    accessorKey: "quantityChange",
    header: "Quantity Change",
    cell: ({ row }) => {
      const change = row.getValue("quantityChange") as number;
      const sign = change > 0 ? "+" : "";
      return (
        <span className={change > 0 ? "text-green-600" : "text-red-600"}>
          {sign}{change}
        </span>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
      const reason = row.getValue("reason") as string;
      return reason.replace(/-/g, " ");
    },
  },
  {
    accessorKey: "user",
    header: "User ID",
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => {
      const notes = row.getValue("notes") as string | undefined;
      return notes ? notes.substring(0, 50) + "..." : "-";
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
] satisfies ColumnDef<InventoryAdjustmentResponse>[];
