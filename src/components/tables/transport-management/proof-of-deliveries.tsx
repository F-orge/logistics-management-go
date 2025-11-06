import { TransportManagementProofOfDeliveriesResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type ProofOfDeliveryResponse = TransportManagementProofOfDeliveriesResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "tripStop",
    header: "Trip Stop ID",
  },
  {
    accessorKey: "coordinate",
    header: "Location",
    cell: ({ row }) => {
      const coords = row.getValue("coordinate") as { lon: number; lat: number } | undefined;
      return coords
        ? `${coords.lat.toFixed(6)}, ${coords.lon.toFixed(6)}`
        : "-";
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
] satisfies ColumnDef<ProofOfDeliveryResponse>[];
