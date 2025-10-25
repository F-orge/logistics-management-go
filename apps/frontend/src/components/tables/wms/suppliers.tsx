import { ColumnDef } from "@tanstack/react-table";
import { TableSupplierQuery } from "@packages/graphql/client/generated/graphql";

// Extract the supplier type from the TableSupplierQuery
type Supplier = NonNullable<TableSupplierQuery["wms"]>["suppliers"][number];

export const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "contactPerson",
    header: "Contact Person",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
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