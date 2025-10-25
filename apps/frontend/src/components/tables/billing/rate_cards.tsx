import { ColumnDef } from "@tanstack/react-table";
import { TableRateCardQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the rate card type from the TableRateCardQuery
type RateCard = NonNullable<TableRateCardQuery["billing"]>["rateCards"][number];

export const columns: ColumnDef<RateCard>[] = [
  {
    header: "Rate Card Details",
    columns: [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "serviceType",
        header: "Service Type",
      },
      {
        accessorKey: "isActive",
        header: "Active",
        cell: ({ row }) => {
          const isActive = row.getValue("isActive") as boolean | null;
          return isActive ? "Yes" : "No";
        },
      },
      {
        accessorKey: "validFrom",
        header: "Valid From",
        cell: ({ row }) => {
          const validFrom = row.getValue("validFrom") as string | null;
          if (!validFrom) return "-";
          return format(new Date(Number(validFrom)), "PPP");
        },
      },
      {
        accessorKey: "validTo",
        header: "Valid To",
        cell: ({ row }) => {
          const validTo = row.getValue("validTo") as string | null;
          if (!validTo) return "-";
          return format(new Date(Number(validTo)), "PPP");
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
    id: "createdByUser",
    header: "Created By",
    columns: [
      {
        accessorKey: "createdByUser.name",
        header: "Name",
        accessorFn: (row) => row.createdByUser?.name,
      },
      {
        accessorKey: "createdByUser.email",
        header: "Email",
        accessorFn: (row) => row.createdByUser?.email,
      },
    ],
  },
];
