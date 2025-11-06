import { TransportManagementDriversResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type DriverResponse = TransportManagementDriversResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "user",
    header: "User ID",
  },
  {
    accessorKey: "licenseNumber",
    header: "License Number",
  },
  {
    accessorKey: "licenseExpiryDate",
    header: "License Expiry",
    cell: ({ row }) => {
      const date = row.getValue("licenseExpiryDate") as string | undefined;
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const colors: Record<string, string> = {
        active: "bg-green-100 text-green-800",
        inactive: "bg-gray-100 text-gray-800",
        "on-leave": "bg-yellow-100 text-yellow-800",
      };
      return (
        <span className={`px-2 py-1 rounded text-sm ${colors[status] || ""}`}>
          {status.replace(/-/g, " ")}
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
] satisfies ColumnDef<DriverResponse>[];
