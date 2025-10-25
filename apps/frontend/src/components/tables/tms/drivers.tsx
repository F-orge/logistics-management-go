import { ColumnDef } from "@tanstack/react-table";
import { TableDriverQuery } from "@packages/graphql/client/generated/graphql";

// Extract the driver type from the TableDriverQuery
type Driver = NonNullable<TableDriverQuery["tms"]>["drivers"][number];

export const columns: ColumnDef<Driver>[] = [
  {
    accessorKey: "user.name",
    header: "Name",
  },
  {
    accessorKey: "licenseNumber",
    header: "License Number",
  },
  {
    accessorKey: "licenseExpiryDate",
    header: "License Expiry Date",
    cell: ({ row }) => {
      const licenseExpiryDate = row.getValue("licenseExpiryDate") as string | null;
      if (!licenseExpiryDate) return "-";
      return new Date(licenseExpiryDate).toLocaleDateString();
    },
  },
  {
    accessorKey: "contactPhone",
    header: "Contact Phone",
  },
  {
    accessorKey: "status",
    header: "Status",
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