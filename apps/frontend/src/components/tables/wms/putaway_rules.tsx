import { ColumnDef } from "@tanstack/react-table";
import { TablePutawayRuleQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the putaway rule type from the TablePutawayRuleQuery
type PutawayRule = NonNullable<TablePutawayRuleQuery["wms"]>["putawayRules"][number];

export const columns: ColumnDef<PutawayRule>[] = [
  {
    header: "Rule Details",
    columns: [
      {
        accessorKey: "priority",
        header: "Priority",
      },
      {
        accessorKey: "locationType",
        header: "Location Type",
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
        accessorKey: "requiresHazmatApproval",
        header: "Hazmat Approved",
        cell: ({ row }) => {
          const requiresHazmatApproval = row.getValue("requiresHazmatApproval") as boolean | null;
          return requiresHazmatApproval ? "Yes" : "No";
        },
      },
      {
        accessorKey: "requiresTemperatureControl",
        header: "Temp Control",
        cell: ({ row }) => {
          const requiresTemperatureControl = row.getValue("requiresTemperatureControl") as boolean | null;
          return requiresTemperatureControl ? "Yes" : "No";
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
    id: "product",
    header: "Product Information",
    columns: [
      {
        accessorKey: "product.name",
        header: "Name",
        accessorFn: (row) => row.product?.name,
      },
      {
        accessorKey: "product.sku",
        header: "SKU",
        accessorFn: (row) => row.product?.sku,
      },
      {
        accessorKey: "product.status",
        header: "Status",
        accessorFn: (row) => row.product?.status,
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
        accessorKey: "warehouse.city",
        header: "City",
        accessorFn: (row) => row.warehouse?.city,
      },
      {
        accessorKey: "warehouse.country",
        header: "Country",
        accessorFn: (row) => row.warehouse?.country,
      },
    ],
  },
  {
    id: "client",
    header: "Client Information",
    columns: [
      {
        accessorKey: "client.name",
        header: "Name",
        accessorFn: (row) => row.client?.name,
      },
      {
        accessorKey: "client.industry",
        header: "Industry",
        accessorFn: (row) => row.client?.industry,
      },
    ],
  },
];
