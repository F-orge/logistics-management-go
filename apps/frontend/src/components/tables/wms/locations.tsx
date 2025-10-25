import { ColumnDef } from "@tanstack/react-table";
import { TableLocationQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the location type from the TableLocationQuery
type Location = NonNullable<TableLocationQuery["wms"]>["locations"][number];

export const columns: ColumnDef<Location>[] = [
  {
    header: "Location Details",
    columns: [
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
    id: "warehouse",
    header: "Warehouse Information",
    columns: [
      {
        accessorKey: "warehouse.name",
        header: "Name",
        accessorFn: (row) => row.warehouse?.name,
      },
      {
        accessorKey: "warehouse.address",
        header: "Address",
        accessorFn: (row) => row.warehouse?.address,
      },
      {
        accessorKey: "warehouse.city",
        header: "City",
        accessorFn: (row) => row.warehouse?.city,
      },
    ],
  },
  {
    id: "parentLocation",
    header: "Parent Location",
    columns: [
      {
        accessorKey: "parentLocation.name",
        header: "Name",
        accessorFn: (row) => row.parentLocation?.name,
      },
      {
        accessorKey: "parentLocation.path",
        header: "Path",
        accessorFn: (row) => row.parentLocation?.path,
      },
    ],
  },
];
