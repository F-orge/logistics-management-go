import { TransportManagementVehiclesResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type VehicleResponse = TransportManagementVehiclesResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "registrationNumber",
    header: "Registration Number",
    cell: ({ row }) => {
      const reg = row.getValue("registrationNumber") as string;
      return (
        <span className="font-mono font-semibold text-lg">
          {reg}
        </span>
      );
    },
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const colors: Record<string, string> = {
        available: "bg-green-100 text-green-800",
        "in-maintenance": "bg-orange-100 text-orange-800",
        "on-trip": "bg-blue-100 text-blue-800",
        "out-of-service": "bg-red-100 text-red-800",
      };
      return (
        <span className={`px-2 py-1 rounded text-sm ${colors[status] || ""}`}>
          {status.replace(/-/g, " ")}
        </span>
      );
    },
  },
  {
    accessorKey: "capacityWeight",
    header: "Capacity Weight (kg)",
  },
  {
    accessorKey: "capacityVolume",
    header: "Capacity Volume (m³)",
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
] satisfies ColumnDef<VehicleResponse>[];
