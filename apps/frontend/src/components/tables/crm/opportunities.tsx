import { ColumnDef } from "@tanstack/react-table";
import { TableOpportunityQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the opportunity type from the TableOpportunityQuery
export type Opportunity = NonNullable<
  TableOpportunityQuery["crm"]
>["opportunities"][number];

export const columns: ColumnDef<Opportunity>[] = [
  {
    header: "Opportunity Details",
    columns: [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "stage",
        header: "Stage",
      },
      {
        accessorKey: "source",
        header: "Source",
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
          const expectedCloseDate = row.getValue("expectedCloseDate") as
            | string
            | null;
          if (!expectedCloseDate) return "-";
          return format(new Date(Number(expectedCloseDate)), "PPP");
        },
      },
      {
        accessorKey: "probability",
        header: "Probability",
        cell: ({ row }) => {
          const probability = row.getValue("probability") as number | null;
          if (probability === null || probability === undefined) return "-";
          return `${probability}%`;
        },
      },
      {
        accessorKey: "lostReason",
        header: "Lost Reason",
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
    id: "company",
    header: "Company Information",
    columns: [
      {
        accessorKey: "company.name",
        header: "Name",
        accessorFn: (row) => row.company?.name,
      },
      {
        accessorKey: "company.industry",
        header: "Industry",
        accessorFn: (row) => row.company?.industry,
      },
      {
        accessorKey: "company.phoneNumber",
        header: "Phone Number",
        accessorFn: (row) => row.company?.phoneNumber,
      },
      {
        accessorKey: "company.country",
        header: "Country",
        accessorFn: (row) => row.company?.country,
      },
    ],
  },
  {
    id: "contact",
    header: "Contact Information",
    columns: [
      {
        accessorKey: "contact.name",
        header: "Name",
        accessorFn: (row) => row.contact?.name,
      },
      {
        accessorKey: "contact.email",
        header: "Email",
        accessorFn: (row) => row.contact?.email,
      },
      {
        accessorKey: "contact.jobTitle",
        header: "Job Title",
        accessorFn: (row) => row.contact?.jobTitle,
      },
      {
        accessorKey: "contact.phoneNumber",
        header: "Phone Number",
        accessorFn: (row) => row.contact?.phoneNumber,
      },
      {
        accessorKey: "contact.company.name",
        header: "Company",
        accessorFn: (row) => row.contact?.company?.name,
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
];
