import { ColumnDef } from "@tanstack/react-table";
import { TableWmsProductQuery } from "@packages/graphql/client/generated/graphql";

// Extract the product type from the TableWmsProductQuery
type WmsProduct = NonNullable<TableWmsProductQuery["wms"]>["wmsProducts"][number];

export const columns: ColumnDef<WmsProduct>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "costPrice",
    header: "Cost Price",
    cell: ({ row }) => {
      const costPrice = row.getValue("costPrice") as number | null;
      if (costPrice === null || costPrice === undefined) return "-";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(costPrice);
    },
  },
  {
    accessorKey: "supplier.name",
    header: "Supplier",
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