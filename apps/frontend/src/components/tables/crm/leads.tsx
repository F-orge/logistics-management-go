import { ColumnDef } from "@tanstack/react-table";
import { TableLeadQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the lead type from the TableLeadQuery
export type Lead = NonNullable<TableLeadQuery["crm"]>["leads"][number];

export const columns: ColumnDef<Lead>[] = [
  {
    header: "Lead Details",
    columns: [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "leadSource",
        header: "Source",
      },
      {
        accessorKey: "leadScore",
        header: "Lead Score",
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
      {
        accessorKey: "convertedAt",
        header: "Converted At",
        cell: ({ row }) => {
          const convertedAt = row.getValue("convertedAt") as string | null;
          if (!convertedAt) return "-";
          return format(new Date(Number(convertedAt)), "PPP");
        },
      },
    ],
  },
  {
    id: "owner",
    header: "Owner Information",
    columns: [
      {
        accessorKey: "owner.name",
        header: "Name",
        accessorFn: (row) => row.owner?.name,
      },
      {
        accessorKey: "owner.email",
        header: "Email",
        accessorFn: (row) => row.owner?.email,
      },
    ],
  },
  {
    id: "campaign",
    header: "Campaign Information",
    columns: [
      {
        accessorKey: "campaign.name",
        header: "Name",
        accessorFn: (row) => row.campaign?.name,
      },
      {
        accessorKey: "campaign.budget",
        header: "Budget",
        accessorFn: (row) => row.campaign?.budget,
        cell: ({ row }) => {
          const budget = row.original.campaign?.budget;
          if (budget === null || budget === undefined) return "-";
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PHP",
          }).format(budget);
        },
      },
      {
        accessorKey: "campaign.startDate",
        header: "Start Date",
        accessorFn: (row) => row.campaign?.startDate,
        cell: ({ row }) => {
          const startDate = row.original.campaign?.startDate;
          if (!startDate) return "-";
          return format(new Date(Number(startDate)), "PPP");
        },
      },
      {
        accessorKey: "campaign.endDate",
        header: "End Date",
        accessorFn: (row) => row.campaign?.endDate,
        cell: ({ row }) => {
          const endDate = row.original.campaign?.endDate;
          if (!endDate) return "-";
          return format(new Date(Number(endDate)), "PPP");
        },
      },
    ],
  },
  {
    id: "convertedCompany",
    header: "Converted Company",
    columns: [
      {
        accessorKey: "convertedCompany.name",
        header: "Name",
        accessorFn: (row) => row.convertedCompany?.name,
      },
      {
        accessorKey: "convertedCompany.industry",
        header: "Industry",
        accessorFn: (row) => row.convertedCompany?.industry,
      },
      {
        accessorKey: "convertedCompany.phoneNumber",
        header: "Phone Number",
        accessorFn: (row) => row.convertedCompany?.phoneNumber,
      },
      {
        accessorKey: "convertedCompany.website",
        header: "Website",
        accessorFn: (row) => row.convertedCompany?.website,
      },
    ],
  },
  {
    id: "convertedContact",
    header: "Converted Contact",
    columns: [
      {
        accessorKey: "convertedContact.name",
        header: "Name",
        accessorFn: (row) => row.convertedContact?.name,
      },
      {
        accessorKey: "convertedContact.email",
        header: "Email",
        accessorFn: (row) => row.convertedContact?.email,
      },
      {
        accessorKey: "convertedContact.jobTitle",
        header: "Job Title",
        accessorFn: (row) => row.convertedContact?.jobTitle,
      },
      {
        accessorKey: "convertedContact.phoneNumber",
        header: "Phone Number",
        accessorFn: (row) => row.convertedContact?.phoneNumber,
      },
      {
        accessorKey: "convertedContact.company.name",
        header: "Company",
        accessorFn: (row) => row.convertedContact?.company?.name,
      },
    ],
  },
  {
    id: "convertedOpportunity",
    header: "Converted Opportunity",
    columns: [
      {
        accessorKey: "convertedOpportunity.name",
        header: "Name",
        accessorFn: (row) => row.convertedOpportunity?.name,
      },
      {
        accessorKey: "convertedOpportunity.dealValue",
        header: "Deal Value",
        accessorFn: (row) => row.convertedOpportunity?.dealValue,
        cell: ({ row }) => {
          const dealValue = row.original.convertedOpportunity?.dealValue;
          if (dealValue === null || dealValue === undefined) return "-";
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PHP",
          }).format(dealValue);
        },
      },
      {
        accessorKey: "convertedOpportunity.source",
        header: "Source",
        accessorFn: (row) => row.convertedOpportunity?.source,
      },
      {
        accessorKey: "convertedOpportunity.stage",
        header: "Stage",
        accessorFn: (row) => row.convertedOpportunity?.stage,
      },
    ],
  },
];
