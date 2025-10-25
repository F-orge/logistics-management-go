import { ColumnDef } from "@tanstack/react-table";
import { TableWmsProductQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the product type from the TableWmsProductQuery
type WmsProduct = NonNullable<TableWmsProductQuery["wms"]>["wmsProducts"][number];

export const columns: ColumnDef<WmsProduct>[] = [
  {
    header: "Product Details",
    columns: [
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
    id: "supplier",
    header: "Supplier Information",
    columns: [
      {
        accessorKey: "supplier.name",
        header: "Name",
        accessorFn: (row) => row.supplier?.name,
      },
      {
        accessorKey: "supplier.contactPerson",
        header: "Contact Person",
        accessorFn: (row) => row.supplier?.contactPerson,
      },
      {
        accessorKey: "supplier.email",
        header: "Email",
        accessorFn: (row) => row.supplier?.email,
      },
      {
        accessorKey: "supplier.phoneNumber",
        header: "Phone Number",
        accessorFn: (row) => row.supplier?.phoneNumber,
      },
    ],
  },
];
