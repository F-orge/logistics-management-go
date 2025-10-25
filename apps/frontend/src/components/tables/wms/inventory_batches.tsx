import { ColumnDef } from "@tanstack/react-table";
import { TableInventoryBatchQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the inventory batch type from the TableInventoryBatchQuery
type InventoryBatch = NonNullable<TableInventoryBatchQuery["wms"]>["inventoryBatches"][number];

export const columns: ColumnDef<InventoryBatch>[] = [
  {
    header: "Batch Details",
    columns: [
      {
        accessorKey: "batchNumber",
        header: "Batch Number",
      },
      {
        accessorKey: "expirationDate",
        header: "Expiration Date",
        cell: ({ row }) => {
          const expirationDate = row.getValue("expirationDate") as string | null;
          if (!expirationDate) return "-";
          return format(new Date(Number(expirationDate)), "PPP");
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
    id: "inventoryStock",
    header: "Inventory Stock",
    columns: [
      {
        accessorKey: "inventoryStock.availableQuantity",
        header: "Available Quantity",
        accessorFn: (row) => row.inventoryStock?.availableQuantity,
      },
      {
        accessorKey: "inventoryStock.quantity",
        header: "Quantity",
        accessorFn: (row) => row.inventoryStock?.quantity,
      },
      {
        accessorKey: "inventoryStock.reservedQuantity",
        header: "Reserved Quantity",
        accessorFn: (row) => row.inventoryStock?.reservedQuantity,
      },
      {
        accessorKey: "inventoryStock.status",
        header: "Status",
        accessorFn: (row) => row.inventoryStock?.status,
      },
    ],
  },
  {
    id: "product",
    header: "Product Information",
    columns: [
      {
        accessorKey: "inventoryStock.product.name",
        header: "Name",
        accessorFn: (row) => row.inventoryStock?.product?.name,
      },
      {
        accessorKey: "inventoryStock.product.sku",
        header: "SKU",
        accessorFn: (row) => row.inventoryStock?.product?.sku,
      },
      {
        accessorKey: "inventoryStock.product.barcode",
        header: "Barcode",
        accessorFn: (row) => row.inventoryStock?.product?.barcode,
      },
    ],
  },
];
