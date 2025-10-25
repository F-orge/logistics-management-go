import { ColumnDef } from "@tanstack/react-table";
import { TableStockTransferQuery } from "@packages/graphql/client/generated/graphql";

// Extract the stock transfer type from the TableStockTransferQuery
type StockTransfer = NonNullable<TableStockTransferQuery["wms"]>["stockTransfers"][number];

export const columns: ColumnDef<StockTransfer>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "product.name",
    header: "Product Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "sourceWarehouse.name",
    header: "Source Warehouse",
  },
  {
    accessorKey: "destinationWarehouse.name",
    header: "Destination Warehouse",
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