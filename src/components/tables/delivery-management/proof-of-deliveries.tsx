import { DeliveryManagementProofOfDeliveriesResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type ProofOfDeliveryResponse = DeliveryManagementProofOfDeliveriesResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "task",
    header: "Task ID",
  },
  {
    accessorKey: "recipientName",
    header: "Recipient Name",
  },
  {
    accessorKey: "coordinates",
    header: "Delivery Location",
    cell: ({ row }) => {
      const coords = row.getValue("coordinates") as { lon: number; lat: number } | undefined;
      return coords
        ? (
            <span className="font-mono text-sm">
              {coords.lat.toFixed(6)}, {coords.lon.toFixed(6)}
            </span>
          )
        : "-";
    },
  },
  {
    accessorKey: "timestamp",
    header: "Delivery Time",
    cell: ({ row }) => {
      const date = row.getValue("timestamp") as string;
      return new Date(date).toLocaleString();
    },
  },
  {
    accessorKey: "signatureData",
    header: "Signature",
    cell: ({ row }) => {
      const sig = row.getValue("signatureData") as any;
      return sig ? (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
          ✓ Signed
        </span>
      ) : (
        "-"
      );
    },
  },
] satisfies ColumnDef<ProofOfDeliveryResponse>[];
