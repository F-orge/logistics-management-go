import { ColumnDef } from "@tanstack/react-table";
import { TableDriverQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the driver type from the TableDriverQuery
type Driver = NonNullable<TableDriverQuery["tms"]>["drivers"][number];

export const columns: ColumnDef<Driver>[] = [
  {
    header: "Driver Details",
    columns: [
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
          return format(new Date(Number(licenseExpiryDate)), "PPP");
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
    id: "user",
    header: "User Information",
    columns: [
      {
        accessorKey: "user.name",
        header: "Name",
        accessorFn: (row) => row.user?.name,
      },
      {
        accessorKey: "user.email",
        header: "Email",
        accessorFn: (row) => row.user?.email,
      },
    ],
  },
];