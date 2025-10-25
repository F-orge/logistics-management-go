import { ColumnDef } from "@tanstack/react-table";
import { TableRateCardQuery } from "@packages/graphql/client/generated/graphql";

// Extract the rate card type from the TableRateCardQuery
type RateCard = NonNullable<TableRateCardQuery["billing"]>["rateCards"][number];

export const columns: ColumnDef<RateCard>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "serviceType",
    header: "Service Type",
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
    accessorKey: "validFrom",
    header: "Valid From",
    cell: ({ row }) => {
      const validFrom = row.getValue("validFrom") as string | null;
      if (!validFrom) return "-";
      return new Date(validFrom).toLocaleDateString();
    },
  },
  {
    accessorKey: "validTo",
    header: "Valid To",
    cell: ({ row }) => {
      const validTo = row.getValue("validTo") as string | null;
      if (!validTo) return "-";
      return new Date(validTo).toLocaleDateString();
    },
  },
  {
    accessorKey: "createdByUser.name",
    header: "Created By",
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