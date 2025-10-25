import { ColumnDef } from "@tanstack/react-table";
import { TableContactQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the contact type from the TableContactQuery
export type Contact = NonNullable<TableContactQuery["crm"]>["contacts"][number];

export const columns: ColumnDef<Contact>[] = [
  {
    header: "Contact Details",
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
        accessorKey: "phoneNumber",
        header: "Phone Number",
      },
      {
        accessorKey: "jobTitle",
        header: "Job Title",
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
        accessorKey: "company.website",
        header: "Website",
        accessorFn: (row) => row.company?.website,
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
];
