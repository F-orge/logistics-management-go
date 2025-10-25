import { ColumnDef } from "@tanstack/react-table";
import { TableLocationQuery } from "@packages/graphql/client/generated/graphql";

// Extract the location type from the TableLocationQuery
type Location = NonNullable<TableLocationQuery["wms"]>["locations"][number];

export const columns: ColumnDef<Location>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
  },
  {
    accessorKey: "warehouse.name",
    header: "Warehouse",
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
    accessorKey: "isPickable",
    header: "Pickable",
    cell: ({ row }) => {
      const isPickable = row.getValue("isPickable") as boolean | null;
      return isPickable ? "Yes" : "No";
    },
  },
  {
    accessorKey: "isReceivable",
    header: "Receivable",
    cell: ({ row }) => {
      const isReceivable = row.getValue("isReceivable") as boolean | null;
      return isReceivable ? "Yes" : "No";
    },
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