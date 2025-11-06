import { BillingManagementRateCardsResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type RateCardResponse = BillingManagementRateCardsResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Rate Card Name",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const icons: Record<string, string> = {
        shipping: "📦",
        storage: "🏢",
        fulfillment: "📋",
        handling: "✋",
        insurance: "🛡️",
        customs: "🚨",
        packaging: "📦",
        returns: "🔄",
      };
      return (
        <span>
          {icons[type] || ""} {type}
        </span>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const desc = row.getValue("description") as string | undefined;
      return desc ? desc.substring(0, 50) + "..." : "-";
    },
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean | undefined;
      return isActive ? (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
          Active
        </span>
      ) : (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
          Inactive
        </span>
      );
    },
  },
  {
    accessorKey: "validFrom",
    header: "Valid From",
    cell: ({ row }) => {
      const date = row.getValue("validFrom") as string | undefined;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },
  {
    accessorKey: "validTo",
    header: "Valid To",
    cell: ({ row }) => {
      const date = row.getValue("validTo") as string | undefined;
      if (!date) return "-";
      const expDate = new Date(date);
      const today = new Date();
      const isExpired = expDate < today;
      return (
        <span className={isExpired ? "text-red-600 font-semibold" : ""}>
          {expDate.toLocaleDateString()}
        </span>
      );
    },
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("created") as string;
      return new Date(date).toLocaleDateString();
    },
  },
] satisfies ColumnDef<RateCardResponse>[];
