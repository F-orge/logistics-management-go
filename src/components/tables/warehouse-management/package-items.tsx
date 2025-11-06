import { WarehouseManagementPackageItemsResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type PackageItemResponse = WarehouseManagementPackageItemsResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "package",
    header: "Package ID",
  },
  {
    accessorKey: "product",
    header: "Product ID",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "lotNumber",
    header: "Lot Number",
  },
  {
    accessorKey: "batch",
    header: "Batch ID",
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => {
      const date = row.getValue("expiryDate") as string | undefined;
      if (!date) return "-";
      const expDate = new Date(date);
      const today = new Date();
      const isExpired = expDate < today;
      return (
        <span className={isExpired ? "text-red-600 font-semibold" : ""}>
          {expDate.toLocaleDateString()}
        </span>
      );
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("created") as string;
      return new Date(date).toLocaleDateString();
    },
  },
  {
    accessorKey: "updated",
    header: "Updated",
    cell: ({ row }) => {
      const date = row.getValue("updated") as string;
      return new Date(date).toLocaleDateString();
    },
  },
] satisfies ColumnDef<PackageItemResponse>[];
