import { ColumnDef } from "@tanstack/react-table";
import { TableInventoryStockQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the inventory stock type from the TableInventoryStockQuery
type InventoryStock = NonNullable<TableInventoryStockQuery["wms"]>["inventoryStocks"][number];

export const columns: ColumnDef<InventoryStock>[] = [
  {
    header: "Stock Details",
    columns: [
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "availableQuantity",
        header: "Available Quantity",
      },
      {
        accessorKey: "reservedQuantity",
        header: "Reserved Quantity",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "lastMovementAt",
        header: "Last Movement At",
        cell: ({ row }) => {
          const lastMovementAt = row.getValue("lastMovementAt") as string | null;
          if (!lastMovementAt) return "-";
          return format(new Date(Number(lastMovementAt)), "PPP");
        },
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
        accessorKey: "product.barcode",
        header: "Barcode",
        accessorFn: (row) => row.product?.barcode,
      },
      {
        accessorKey: "product.status",
        header: "Status",
        accessorFn: (row) => row.product?.status,
      },
    ],
  },
  {
    id: "location",
    header: "Location Information",
    columns: [
      {
        accessorKey: "location.name",
        header: "Name",
        accessorFn: (row) => row.location?.name,
      },
      {
        accessorKey: "location.barcode",
        header: "Barcode",
        accessorFn: (row) => row.location?.barcode,
      },
    ],
  },
];
