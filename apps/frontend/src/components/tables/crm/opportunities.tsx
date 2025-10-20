import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.crm.shape.opportunities>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "ownerId",
    header: "Owner ID",
  },
  {
    accessorKey: "campaignId",
    header: "Campaign ID",
  },
  {
    accessorKey: "companyId",
    header: "Company ID",
  },
  {
    accessorKey: "contactId",
    header: "Contact ID",
  },
  {
    accessorKey: "dealValue",
    header: "Deal Value",
  },
  {
    accessorKey: "expectedCloseDate",
    header: "Expected Close Date",
  },
  {
    accessorKey: "lostReason",
    header: "Lost Reason",
  },
  {
    accessorKey: "probability",
    header: "Probability",
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "stage",
    header: "Stage",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
