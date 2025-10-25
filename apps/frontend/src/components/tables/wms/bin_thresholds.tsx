import { ColumnDef } from "@tanstack/react-table";
import { TableBinThresholdQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the bin threshold type from the TableBinThresholdQuery
type BinThreshold = NonNullable<TableBinThresholdQuery["wms"]>["binThresholds"][number];

export const columns: ColumnDef<BinThreshold>[] = [
  {
    header: "Bin Threshold Details",
    columns: [
      {
        accessorKey: "minQuantity",
        header: "Min Quantity",
      },
      {
        accessorKey: "maxQuantity",
        header: "Max Quantity",
      },
      {
        accessorKey: "reorderQuantity",
        header: "Reorder Quantity",
      },
      {
        accessorKey: "alertThreshold",
        header: "Alert Threshold",
      },
      {
        accessorKey: "isActive",
        header: "Active",
        cell: ({ row }) => {
          const isActive = row.getValue("isActive") as boolean | null;
          return isActive ? "Yes" : "No";
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
      {
        accessorKey: "product.description",
        header: "Description",
        accessorFn: (row) => row.product?.description,
      },
    ],
  },
];