import { CustomerRelationsLeadsResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type LeadResponse = CustomerRelationsLeadsResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Lead Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("email") as string | undefined;
      return email ? (
        <a href={`mailto:${email}`} className="text-blue-500 hover:underline">
          {email}
        </a>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string | undefined;
      const colors: Record<string, string> = {
        new: "bg-blue-100 text-blue-800",
        contacted: "bg-yellow-100 text-yellow-800",
        qualified: "bg-green-100 text-green-800",
        unqualified: "bg-red-100 text-red-800",
        converted: "bg-green-100 text-green-800",
      };
      return (
        <span className={`px-2 py-1 rounded text-sm ${colors[status || ""] || ""}`}>
          {status || "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      const source = row.getValue("source") as string | undefined;
      return source ? source.replace(/-/g, " ") : "-";
    },
  },
  {
    accessorKey: "score",
    header: "Score",
  },
  {
    accessorKey: "convertedAt",
    header: "Converted At",
    cell: ({ row }) => {
      const date = row.getValue("convertedAt") as string | undefined;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },
  {
    accessorKey: "campaign",
    header: "Campaign ID",
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("created") as string;
      return new Date(date).toLocaleDateString();
    },
  },
] satisfies ColumnDef<LeadResponse>[];
