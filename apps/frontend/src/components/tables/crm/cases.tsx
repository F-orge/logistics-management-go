import { ColumnDef } from "@tanstack/react-table";
import { TableCaseQuery } from "@packages/graphql/client/generated/graphql";

// Extract the case type from the TableCaseQuery
type Case = NonNullable<TableCaseQuery["crm"]>["cases"][number];

export const columns: ColumnDef<Case>[] = [
  {
    accessorKey: "caseNumber",
    header: "Case Number",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "contact.name",
    header: "Contact Name",
  },
  {
    accessorKey: "owner.name",
    header: "Owner Name",
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