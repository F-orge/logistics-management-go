import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.crm.shape.leads>
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
    accessorKey: "email",
    header: "Email",
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
    accessorKey: "convertedAt",
    header: "Converted At",
  },
  {
    accessorKey: "convertedCompanyId",
    header: "Converted Company ID",
  },
  {
    accessorKey: "convertedContactId",
    header: "Converted Contact ID",
  },
  {
    accessorKey: "convertedOpportunityId",
    header: "Converted Opportunity ID",
  },
  {
    accessorKey: "leadScore",
    header: "Lead Score",
  },
  {
    accessorKey: "leadSource",
    header: "Lead Source",
  },
  {
    accessorKey: "status",
    header: "Status",
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
