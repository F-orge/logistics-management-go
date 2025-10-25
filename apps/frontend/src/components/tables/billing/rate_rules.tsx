import { ColumnDef } from "@tanstack/react-table";
import { TableRateRuleQuery } from "@packages/graphql/client/generated/graphql";

// Extract the rate rule type from the TableRateRuleQuery
type RateRule = NonNullable<TableRateRuleQuery["billing"]>["rateRules"][number];

export const columns: ColumnDef<RateRule>[] = [
  {
    accessorKey: "rateCard.name",
    header: "Rate Card",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "pricingModel",
    header: "Pricing Model",
  },
  {
    accessorKey: "condition",
    header: "Condition",
  },
  {
    accessorKey: "minValue",
    header: "Min Value",
  },
  {
    accessorKey: "maxValue",
    header: "Max Value",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number | null;
      if (price === null || price === undefined) return "-";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP", // Assuming PHP as default currency
      }).format(price);
    },
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
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string | null;
      if (!createdAt) return "-";
      return new Date(createdAt).toLocaleDateString();
    },
  },
];