import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.crm.shape.opportunityProducts>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "opportunityId",
    header: "Opportunity ID",
  },
  {
    accessorKey: "productId",
    header: "Product ID",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
];
