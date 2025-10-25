import { ColumnDef } from "@tanstack/react-table";
import { TableCaseQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the case type from the TableCaseQuery
type Case = NonNullable<TableCaseQuery["crm"]>["cases"][number];

export const columns: ColumnDef<Case>[] = [
  {
    header: "Case Details",
    columns: [
      {
        accessorKey: "caseNumber",
        header: "Case Number",
      },
      {
        accessorKey: "priority",
        header: "Priority",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "type",
        header: "Type",
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
        accessorKey: "contact.phoneNumber",
        header: "Phone Number",
        accessorFn: (row) => row.contact?.phoneNumber,
      },
      {
        accessorKey: "contact.jobTitle",
        header: "Job Title",
        accessorFn: (row) => row.contact?.jobTitle,
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
        accessorFn: (row) => row.owner.name,
      },
      {
        accessorKey: "owner.email",
        header: "Email",
        accessorFn: (row) => row.owner.email,
      },
    ],
  },
];
