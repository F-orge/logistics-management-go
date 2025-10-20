import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.billing.shape.rateRules>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "condition",
    header: "Condition",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "isActive",
    header: "Is Active",
  },
  {
    accessorKey: "maxValue",
    header: "Max Value",
  },
  {
    accessorKey: "minValue",
    header: "Min Value",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "pricingModel",
    header: "Pricing Model",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "rateCardId",
    header: "Rate Card ID",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
];
