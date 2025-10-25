import { ColumnDef } from "@tanstack/react-table";
import { TableCustomerTrackingLinkQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the customer tracking link type from the CustomerTrackingLinkQuery
export type CustomerTrackingLink = NonNullable<
  TableCustomerTrackingLinkQuery["dms"]
>["customerTrackingLinks"][number];

export const columns: ColumnDef<CustomerTrackingLink>[] = [
  {
    accessorKey: "trackingToken",
    header: "Tracking Token",
  },
  {
    accessorKey: "accessCount",
    header: "Access Count",
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean | null;
      return isActive ? "Yes" : "No";
    },
  },
  {
    accessorKey: "expiresAt",
    header: "Expires At",
    cell: ({ row }) => {
      const expiresAt = row.getValue("expiresAt") as string | null;
      if (!expiresAt) return "-";
      return format(new Date(Number(expiresAt)), "PPP");
    },
  },
  {
    accessorKey: "lastAccessedAt",
    header: "Last Accessed At",
    cell: ({ row }) => {
      const lastAccessedAt = row.getValue("lastAccessedAt") as string | null;
      if (!lastAccessedAt) return "-";
      return format(new Date(Number(lastAccessedAt)), "PPP");
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
];
