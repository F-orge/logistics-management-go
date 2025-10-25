import { ColumnDef } from "@tanstack/react-table";
import { TableContactQuery } from "@packages/graphql/client/generated/graphql";

// Extract the contact type from the TableContactQuery
type Contact = NonNullable<TableContactQuery["crm"]>["contacts"][number];

export const columns: ColumnDef<Contact>[] = [
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
    accessorKey: "company.name",
    header: "Company",
  },
  {
    accessorKey: "owner.name",
    header: "Owner",
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