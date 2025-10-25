import { ColumnDef } from "@tanstack/react-table";
import { TableReorderPointQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the reorder point type from the TableReorderPointQuery
type ReorderPoint = NonNullable<TableReorderPointQuery["wms"]>["reorderPoints"][number];

export const columns: ColumnDef<ReorderPoint>[] = [
  {
    header: "Reorder Point Details",
    columns: [
      {
        accessorKey: "threshold",
        header: "Threshold",
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
    id: "warehouse",
    header: "Warehouse Information",
    columns: [
      {
        accessorKey: "warehouse.name",
        header: "Name",
        accessorFn: (row) => row.warehouse?.name,
      },
      {
        accessorKey: "warehouse.city",
        header: "City",
        accessorFn: (row) => row.warehouse?.city,
      },
      {
        accessorKey: "warehouse.country",
        header: "Country",
        accessorFn: (row) => row.warehouse?.country,
      },
    ],
  },
];
