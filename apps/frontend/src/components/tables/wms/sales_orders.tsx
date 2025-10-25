import { ColumnDef } from "@tanstack/react-table";
import { TableSalesOrderQuery } from "@packages/graphql/client/generated/graphql";

// Extract the sales order type from the TableSalesOrderQuery
type SalesOrder = NonNullable<TableSalesOrderQuery["wms"]>["salesOrders"][number];

export const columns: ColumnDef<SalesOrder>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order Number",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "shippingAddress",
    header: "Shipping Address",
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