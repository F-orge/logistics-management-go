import { TransportManagementTripStopsResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type TripStopResponse = TransportManagementTripStopsResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "trip",
    header: "Trip ID",
  },
  {
    accessorKey: "shipment",
    header: "Shipment ID",
  },
  {
    accessorKey: "sequence",
    header: "Sequence",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const colors: Record<string, string> = {
        pending: "bg-yellow-100 text-yellow-800",
        arrived: "bg-blue-100 text-blue-800",
        completed: "bg-green-100 text-green-800",
        skipped: "bg-gray-100 text-gray-800",
      };
      return (
        <span className={`px-2 py-1 rounded text-sm ${colors[status] || ""}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "estimatedArrivalTime",
    header: "Est. Arrival",
    cell: ({ row }) => {
      const date = row.getValue("estimatedArrivalTime") as string | undefined;
      return date ? new Date(date).toLocaleString() : "-";
    },
  },
  {
    accessorKey: "actualArrivalTime",
    header: "Actual Arrival",
    cell: ({ row }) => {
      const date = row.getValue("actualArrivalTime") as string | undefined;
      return date ? new Date(date).toLocaleString() : "-";
    },
  },
  {
    accessorKey: "estimatedDepartureTime",
    header: "Est. Departure",
    cell: ({ row }) => {
      const date = row.getValue("estimatedDepartureTime") as string | undefined;
      return date ? new Date(date).toLocaleString() : "-";
    },
  },
  {
    accessorKey: "actualDepartureTime",
    header: "Actual Departure",
    cell: ({ row }) => {
      const date = row.getValue("actualDepartureTime") as string | undefined;
      return date ? new Date(date).toLocaleString() : "-";
    },
  },
] satisfies ColumnDef<TripStopResponse>[];
