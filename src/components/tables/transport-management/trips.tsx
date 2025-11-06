import { TransportManagementTripsResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type TripResponse = TransportManagementTripsResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "driver",
    header: "Driver ID",
  },
  {
    accessorKey: "vehicle",
    header: "Vehicle ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const colors: Record<string, string> = {
        planned: "bg-gray-100 text-gray-800",
        "in-progress": "bg-blue-100 text-blue-800",
        completed: "bg-green-100 text-green-800",
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
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("created") as string;
      return new Date(date).toLocaleDateString();
    },
  },
  {
    accessorKey: "updated",
    header: "Updated",
    cell: ({ row }) => {
      const date = row.getValue("updated") as string;
      return new Date(date).toLocaleDateString();
    },
  },
] satisfies ColumnDef<TripResponse>[];
