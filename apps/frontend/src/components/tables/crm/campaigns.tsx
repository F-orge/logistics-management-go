import { ColumnDef } from "@tanstack/react-table";
import { execute } from "@packages/graphql/client";
import { TableCampaignQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

export type Campaign = NonNullable<
  TableCampaignQuery["crm"]
>["campaigns"][number];

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => {
      const budget = row.getValue("budget") as number | null;
      if (budget === null || budget === undefined) return "-";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(budget);
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const startDate = row.getValue("startDate") as string | null;
      if (!startDate) return "-";
      return format(new Date(Number(startDate)), "PPP");
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const endDate = row.getValue("endDate") as string | null;
      if (!endDate) return "-";
      return format(new Date(Number(endDate)), "PPP");
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string | null;
      if (!createdAt) return "-";
      return format(new Date(Number(createdAt)), "PPP");
    },
  },
];
