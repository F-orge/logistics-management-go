import { CustomerRelationsCasesResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type CaseResponse = CustomerRelationsCasesResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "caseNumber",
    header: "Case Number",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return type.replace(/-/g, " ");
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const colors: Record<string, string> = {
        new: "bg-blue-100 text-blue-800",
        "in-progress": "bg-yellow-100 text-yellow-800",
        "waiting-for-customer": "bg-orange-100 text-orange-800",
        "waiting-for-internal": "bg-purple-100 text-purple-800",
        escalated: "bg-red-100 text-red-800",
        resolved: "bg-green-100 text-green-800",
        closed: "bg-gray-100 text-gray-800",
        cancelled: "bg-red-100 text-red-800",
      };
      return (
        <span className={`px-2 py-1 rounded text-sm ${colors[status] || ""}`}>
          {status.replace(/-/g, " ")}
        </span>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;
      const colors: Record<string, string> = {
        critical: "bg-red-100 text-red-800",
        high: "bg-orange-100 text-orange-800",
        medium: "bg-yellow-100 text-yellow-800",
        low: "bg-green-100 text-green-800",
      };
      return (
        <span className={`px-2 py-1 rounded text-sm ${colors[priority] || ""}`}>
          {priority}
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
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("created") as string;
      return new Date(date).toLocaleDateString();
    },
  },
] satisfies ColumnDef<CaseResponse>[];
