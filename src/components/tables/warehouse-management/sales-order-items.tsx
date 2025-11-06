import { WarehouseManagementSalesOrderItemsResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type SalesOrderItemResponse = WarehouseManagementSalesOrderItemsResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "salesOrder",
    header: "Sales Order ID",
  },
  {
    accessorKey: "product",
    header: "Product ID",
  },
  {
    accessorKey: "quantityOrdered",
    header: "Quantity Ordered",
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
] satisfies ColumnDef<SalesOrderItemResponse>[];
