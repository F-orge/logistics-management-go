import { ColumnDef } from "@tanstack/react-table";
import { TableOpportunityQuery } from "@packages/graphql/client/generated/graphql";

// Extract the opportunity type from the TableOpportunityQuery
type Opportunity = NonNullable<TableOpportunityQuery["crm"]>["opportunities"][number];

export const columns: ColumnDef<Opportunity>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "stage",
    header: "Stage",
  },
  {
    accessorKey: "dealValue",
    header: "Deal Value",
    cell: ({ row }) => {
      const dealValue = row.getValue("dealValue") as number | null;
      if (dealValue === null || dealValue === undefined) return "-";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(dealValue);
    },
  },
  {
    accessorKey: "expectedCloseDate",
    header: "Expected Close Date",
    cell: ({ row }) => {
      const expectedCloseDate = row.getValue("expectedCloseDate") as string | null;
      if (!expectedCloseDate) return "-";
      return new Date(expectedCloseDate).toLocaleDateString();
    },
  },
  {
    accessorKey: "company.name",
    header: "Company",
  },
  {
    accessorKey: "contact.name",
    header: "Contact",
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