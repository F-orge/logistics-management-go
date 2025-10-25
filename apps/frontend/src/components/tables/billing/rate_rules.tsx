import { ColumnDef } from "@tanstack/react-table";
import { TableRateRuleQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the rate rule type from the TableRateRuleQuery
type RateRule = NonNullable<TableRateRuleQuery["billing"]>["rateRules"][number];

export const columns: ColumnDef<RateRule>[] = [
  {
    header: "Rate Rule Details",
    columns: [
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
    id: "rateCard",
    header: "Rate Card Information",
    columns: [
      {
        accessorKey: "rateCard.name",
        header: "Name",
        accessorFn: (row) => row.rateCard?.name,
      },
      {
        accessorKey: "rateCard.serviceType",
        header: "Service Type",
        accessorFn: (row) => row.rateCard?.serviceType,
      },
      {
        accessorKey: "rateCard.isActive",
        header: "Active",
        accessorFn: (row) => row.rateCard?.isActive,
        cell: ({ row }) => {
          const isActive = row.original.rateCard?.isActive;
          return isActive ? "Yes" : "No";
        },
      },
    ],
  },
];
