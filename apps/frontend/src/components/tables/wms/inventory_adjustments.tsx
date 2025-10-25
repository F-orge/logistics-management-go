import { ColumnDef } from "@tanstack/react-table";
import { TableInventoryAdjustmentQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the inventory adjustment type from the TableInventoryAdjustmentQuery
type InventoryAdjustment = NonNullable<TableInventoryAdjustmentQuery["wms"]>["inventoryAdjustments"][number];

export const columns: ColumnDef<InventoryAdjustment>[] = [
  {
    header: "Adjustment Details",
    columns: [
      {
        accessorKey: "reason",
        header: "Reason",
      },
      {
        accessorKey: "quantityChange",
        header: "Quantity Change",
      },
      {
        accessorKey: "notes",
        header: "Notes",
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
    id: "user",
    header: "User Information",
    columns: [
      {
        accessorKey: "user.name",
        header: "Name",
        accessorFn: (row) => row.user?.name,
      },
      {
        accessorKey: "user.email",
        header: "Email",
        accessorFn: (row) => row.user?.email,
      },
    ],
  },
];
