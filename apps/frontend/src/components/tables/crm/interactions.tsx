import { ColumnDef } from "@tanstack/react-table";
import { TableInteractionQuery } from "@packages/graphql/client/generated/graphql";

// Extract the interaction type from the TableInteractionQuery
type Interaction = NonNullable<TableInteractionQuery["crm"]>["interactions"][number];

export const columns: ColumnDef<Interaction>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "outcome",
    header: "Outcome",
  },
  {
    accessorKey: "interactionDate",
    header: "Interaction Date",
    cell: ({ row }) => {
      const interactionDate = row.getValue("interactionDate") as string | null;
      if (!interactionDate) return "-";
      return new Date(interactionDate).toLocaleDateString();
    },
  },
  {
    accessorKey: "user.name",
    header: "User",
  },
  {
    accessorKey: "contact.name",
    header: "Contact",
  },
  {
    accessorKey: "case.caseNumber",
    header: "Case Number",
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