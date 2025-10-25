import { ColumnDef } from "@tanstack/react-table";
import { TableLeadQuery } from "@packages/graphql/client/generated/graphql";

// Extract the lead type from the TableLeadQuery
type Lead = NonNullable<TableLeadQuery["crm"]>["leads"][number];

export const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "leadSource",
    header: "Source",
  },
  {
    accessorKey: "leadScore",
    header: "Lead Score",
  },
  {
    accessorKey: "owner.name",
    header: "Owner",
  },
  {
    accessorKey: "campaign.name",
    header: "Campaign",
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