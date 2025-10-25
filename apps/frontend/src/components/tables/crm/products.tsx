import { ColumnDef } from "@tanstack/react-table";
import { TableProductQuery } from "@packages/graphql/client/generated/graphql";

// Extract the product type from the TableProductQuery
type Product = NonNullable<TableProductQuery["crm"]>["products"][number];

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number | null;
      if (price === null || price === undefined) return "-";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(price);
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