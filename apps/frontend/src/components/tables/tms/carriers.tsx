import { ColumnDef } from "@tanstack/react-table";
import { TableCarrierQueryQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the carrier type from the TableCarrierQuery
type Carrier = NonNullable<TableCarrierQueryQuery["tms"]>["carriers"][number];

export const columns: ColumnDef<Carrier>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "contactPerson",
    header: "Contact Person",
  },
  {
    accessorKey: "contactEmail",
    header: "Contact Email",
  },
  {
    accessorKey: "contactPhone",
    header: "Contact Phone",
  },
  {
    accessorKey: "servicesOffered",
    header: "Services Offered",
    cell: ({ row }) => {
      const servicesOffered = row.getValue("servicesOffered") as
        | string[]
        | null;
      if (!servicesOffered || servicesOffered.length === 0) return "-";
      return servicesOffered.join(", ");
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
];
