import { WarehouseManagementPackagesResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type PackageResponse = WarehouseManagementPackagesResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "salesOrder",
    header: "Sales Order ID",
  },
  {
    accessorKey: "packageNumber",
    header: "Package Number",
  },
  {
    accessorKey: "warehouse",
    header: "Warehouse ID",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "weight",
    header: "Weight (kg)",
  },
  {
    accessorKey: "length",
    header: "Length",
  },
  {
    accessorKey: "width",
    header: "Width",
  },
  {
    accessorKey: "height",
    header: "Height",
  },
  {
    accessorKey: "isFragile",
    header: "Fragile",
    cell: ({ row }) => {
      const isFragile = row.getValue("isFragile") as boolean | undefined;
      return isFragile ? (
        <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
          Fragile
        </span>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "isHazmat",
    header: "Hazmat",
    cell: ({ row }) => {
      const isHazmat = row.getValue("isHazmat") as boolean | undefined;
      return isHazmat ? (
        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm">
          Hazmat
        </span>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "requireSignature",
    header: "Requires Signature",
    cell: ({ row }) => {
      const req = row.getValue("requireSignature") as boolean | undefined;
      return req ? "✓" : "-";
    },
  },
  {
    accessorKey: "insuranceValue",
    header: "Insurance Value",
    cell: ({ row }) => {
      const value = row.getValue("insuranceValue") as number | undefined;
      return value
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(value)
        : "-";
    },
  },
  {
    accessorKey: "packedAt",
    header: "Packed At",
    cell: ({ row }) => {
      const date = row.getValue("packedAt") as string | undefined;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },
  {
    accessorKey: "shippedAt",
    header: "Shipped At",
    cell: ({ row }) => {
      const date = row.getValue("shippedAt") as string | undefined;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },
] satisfies ColumnDef<PackageResponse>[];
