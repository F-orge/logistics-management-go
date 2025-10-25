import { ColumnDef } from "@tanstack/react-table";
import { TablePackageQuery } from "@packages/graphql/client/generated/graphql";

// Extract the package type from the TablePackageQuery
type Package = NonNullable<TablePackageQuery["wms"]>["packages"][number];

export const columns: ColumnDef<Package>[] = [
  {
    accessorKey: "packageNumber",
    header: "Package Number",
  },
  {
    accessorKey: "trackingNumber",
    header: "Tracking Number",
  },
  {
    accessorKey: "carrier",
    header: "Carrier",
  },
  {
    accessorKey: "packageType",
    header: "Package Type",
  },
  {
    accessorKey: "isFragile",
    header: "Fragile",
    cell: ({ row }) => {
      const isFragile = row.getValue("isFragile") as boolean | null;
      return isFragile ? "Yes" : "No";
    },
  },
  {
    accessorKey: "isHazmat",
    header: "Hazmat",
    cell: ({ row }) => {
      const isHazmat = row.getValue("isHazmat") as boolean | null;
      return isHazmat ? "Yes" : "No";
    },
  },
  {
    accessorKey: "requiresSignature",
    header: "Requires Signature",
    cell: ({ row }) => {
      const requiresSignature = row.getValue("requiresSignature") as boolean | null;
      return requiresSignature ? "Yes" : "No";
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