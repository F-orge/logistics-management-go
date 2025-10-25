import { ColumnDef } from "@tanstack/react-table";
import { TableCompanyQueryQuery } from "@packages/graphql/client/generated/graphql";

// Extract the company type from the TableCompanyQuery
type Company = NonNullable<TableCompanyQueryQuery["crm"]>["companies"][number];

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "industry",
    header: "Industry",
  },
  {
    accessorKey: "owner.name",
    header: "Owner",
  },
  {
    accessorKey: "annualRevenue",
    header: "Annual Revenue",
    cell: ({ row }) => {
      const annualRevenue = row.getValue("annualRevenue") as number | null;
      if (annualRevenue === null || annualRevenue === undefined) return "-";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(annualRevenue);
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "website",
    header: "Website",
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
