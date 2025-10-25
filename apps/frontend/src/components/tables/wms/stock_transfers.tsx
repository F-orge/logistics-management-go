import { ColumnDef } from "@tanstack/react-table";
import { TableStockTransferQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the stock transfer type from the TableStockTransferQuery
type StockTransfer = NonNullable<TableStockTransferQuery["wms"]>["stockTransfers"][number];

export const columns: ColumnDef<StockTransfer>[] = [
  {
    header: "Transfer Details",
    columns: [
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
          const createdAt = row.getValue("createdAt") as string | null;
          if (!createdAt) return "-";
          return format(new Date(Number(createdAt)), "PPP");
        },
      },
    ],
  },
  {
    id: "product",
    header: "Product Information",
    columns: [
      {
        accessorKey: "product.name",
        header: "Name",
        accessorFn: (row) => row.product?.name,
      },
      {
        accessorKey: "product.sku",
        header: "SKU",
        accessorFn: (row) => row.product?.sku,
      },
      {
        accessorKey: "product.status",
        header: "Status",
        accessorFn: (row) => row.product?.status,
      },
    ],
  },
  {
    id: "sourceWarehouse",
    header: "Source Warehouse",
    columns: [
      {
        accessorKey: "sourceWarehouse.name",
        header: "Name",
        accessorFn: (row) => row.sourceWarehouse?.name,
      },
      {
        accessorKey: "sourceWarehouse.city",
        header: "City",
        accessorFn: (row) => row.sourceWarehouse?.city,
      },
    ],
  },
  {
    id: "destinationWarehouse",
    header: "Destination Warehouse",
    columns: [
      {
        accessorKey: "destinationWarehouse.name",
        header: "Name",
        accessorFn: (row) => row.destinationWarehouse?.name,
      },
      {
        accessorKey: "destinationWarehouse.city",
        header: "City",
        accessorFn: (row) => row.destinationWarehouse?.city,
      },
    ],
  },
];
