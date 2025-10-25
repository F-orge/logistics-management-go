import { ColumnDef } from "@tanstack/react-table";
import { TableInteractionQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the interaction type from the TableInteractionQuery
export type Interaction = NonNullable<
  TableInteractionQuery["crm"]
>["interactions"][number];

export const columns: ColumnDef<Interaction>[] = [
  {
    header: "Interaction Details",
    columns: [
      {
        accessorKey: "type",
        header: "Type",
      },
      {
        accessorKey: "outcome",
        header: "Outcome",
      },
      {
        accessorKey: "notes",
        header: "Notes",
      },
      {
        accessorKey: "interactionDate",
        header: "Interaction Date",
        cell: ({ row }) => {
          const interactionDate = row.getValue("interactionDate") as
            | string
            | null;
          if (!interactionDate) return "-";
          return format(new Date(Number(interactionDate)), "PPP");
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
    id: "user",
    header: "User Information",
    columns: [
      {
        accessorKey: "user.name",
        header: "Name",
        accessorFn: (row) => row.user?.name,
      },
      {
        accessorKey: "user.email",
        header: "Email",
        accessorFn: (row) => row.user?.email,
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
    id: "case",
    header: "Case Information",
    columns: [
      {
        accessorKey: "case.caseNumber",
        header: "Case Number",
        accessorFn: (row) => row.case?.caseNumber,
      },
      {
        accessorKey: "case.type",
        header: "Type",
        accessorFn: (row) => row.case?.type,
      },
      {
        accessorKey: "case.priority",
        header: "Priority",
        accessorFn: (row) => row.case?.priority,
      },
      {
        accessorKey: "case.status",
        header: "Status",
        accessorFn: (row) => row.case?.status,
      },
    ],
  },
];
