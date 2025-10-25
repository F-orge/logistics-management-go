import { ColumnDef } from "@tanstack/react-table";
import { TableCompanyQueryQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the company type from the TableCompanyQuery
type Company = NonNullable<TableCompanyQueryQuery["crm"]>["companies"][number];

export const columns: ColumnDef<Company>[] = [
  {
    header: "Company Details",
    columns: [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "industry",
        header: "Industry",
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
    id: "clientAccount",
    header: "Client Account",
    columns: [
      {
        accessorKey: "clientAccount.walletBalance",
        header: "Wallet Balance",
        accessorFn: (row) => row.clientAccount?.walletBalance,
        cell: ({ row }) => {
          const walletBalance = row.original.clientAccount?.walletBalance;
          if (walletBalance === null || walletBalance === undefined) return "-";
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: row.original.clientAccount?.currency || "PHP",
          }).format(walletBalance);
        },
      },
      {
        accessorKey: "clientAccount.creditLimit",
        header: "Credit Limit",
        accessorFn: (row) => row.clientAccount?.creditLimit,
        cell: ({ row }) => {
          const creditLimit = row.original.clientAccount?.creditLimit;
          if (creditLimit === null || creditLimit === undefined) return "-";
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: row.original.clientAccount?.currency || "PHP",
          }).format(creditLimit);
        },
      },
    ],
  },
  {
    id: "location",
    header: "Location",
    columns: [
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
        accessorKey: "postalCode",
        header: "Postal Code",
      },
      {
        accessorKey: "country",
        header: "Country",
      },
    ],
  },
];
