import { ColumnDef } from "@tanstack/react-table";
import { TableInventoryBatchQuery } from "@packages/graphql/client/generated/graphql";

// Extract the inventory batch type from the TableInventoryBatchQuery
type InventoryBatch = NonNullable<TableInventoryBatchQuery["wms"]>["inventoryBatches"][number];

export const columns: ColumnDef<InventoryBatch>[] = [
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
  },
  {
    accessorKey: "inventoryStock.product.name",
    header: "Product Name",
  },
  {
    accessorKey: "inventoryStock.availableQuantity",
    header: "Available Quantity",
  },
  {
    accessorKey: "expirationDate",
    header: "Expiration Date",
    cell: ({ row }) => {
      const expirationDate = row.getValue("expirationDate") as string | null;
      if (!expirationDate) return "-";
      return new Date(expirationDate).toLocaleDateString();
    },
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