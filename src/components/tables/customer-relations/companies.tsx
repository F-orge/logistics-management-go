import { ColumnDef } from "@tanstack/react-table";
import { CustomerRelationsCompaniesResponse } from "@/lib/pb.types";

type CompanyResponse = CustomerRelationsCompaniesResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Company Name",
  },
  {
    accessorKey: "industry",
    header: "Industry",
  },
  {
    accessorKey: "annualRevenue",
    header: "Annual Revenue",
    cell: ({ row }) => {
      const revenue = row.getValue("annualRevenue") as number | undefined;
      return revenue
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(revenue)
        : "-";
    },
  },
  {
    accessorKey: "street",
    header: "Street",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "postalCode",
    header: "Postal Code",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "owner",
    header: "Owner",
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => {
      const url = row.getValue("website") as string | undefined;
      return url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {url}
        </a>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("created") as string;
      return new Date(date).toLocaleDateString();
    },
  },
  {
    accessorKey: "updated",
    header: "Updated",
    cell: ({ row }) => {
      const date = row.getValue("updated") as string;
      return new Date(date).toLocaleDateString();
    },
  },
] satisfies ColumnDef<CompanyResponse>[];
