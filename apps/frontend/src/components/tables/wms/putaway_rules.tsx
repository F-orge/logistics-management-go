import { ColumnDef } from "@tanstack/react-table";
import { TablePutawayRuleQuery } from "@packages/graphql/client/generated/graphql";

// Extract the putaway rule type from the TablePutawayRuleQuery
type PutawayRule = NonNullable<TablePutawayRuleQuery["wms"]>["putawayRules"][number];

export const columns: ColumnDef<PutawayRule>[] = [
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "locationType",
    header: "Location Type",
  },
  {
    accessorKey: "product.name",
    header: "Product Name",
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
    header: "Created",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string | null;
      if (!createdAt) return "-";
      return new Date(createdAt).toLocaleDateString();
    },
  },
];