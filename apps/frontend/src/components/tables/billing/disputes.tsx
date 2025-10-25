import { ColumnDef } from "@tanstack/react-table";
import { TableDisputeQuery } from "@packages/graphql/client/generated/graphql";

// Extract the dispute type from the TableDisputeQuery
type Dispute = NonNullable<TableDisputeQuery["billing"]>["disputes"][number];

export const columns: ColumnDef<Dispute>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "disputedAmount",
    header: "Disputed Amount",
    cell: ({ row }) => {
      const disputedAmount = row.getValue("disputedAmount") as number | null;
      if (disputedAmount === null || disputedAmount === undefined) return "-";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP", // Assuming PHP as default currency
      }).format(disputedAmount);
    },
  },
  {
    accessorKey: "client.name",
    header: "Client Name",
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted At",
    cell: ({ row }) => {
      const submittedAt = row.getValue("submittedAt") as string | null;
      if (!submittedAt) return "-";
      return new Date(submittedAt).toLocaleDateString();
    },
  },
  {
    accessorKey: "resolvedAt",
    header: "Resolved At",
    cell: ({ row }) => {
      const resolvedAt = row.getValue("resolvedAt") as string | null;
      if (!resolvedAt) return "-";
      return new Date(resolvedAt).toLocaleDateString();
    },
  },
  {
    accessorKey: "resolvedByUser.name",
    header: "Resolved By",
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