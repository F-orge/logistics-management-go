import { ColumnDef } from "@tanstack/react-table";
import { TableTmsProofOfDeliveryQuery } from "@packages/graphql/client/generated/graphql";

// Extract the proof of delivery type from the TableTmsProofOfDeliveryQuery
type TmsProofOfDelivery = NonNullable<TableTmsProofOfDeliveryQuery["tms"]>["proofOfDeliveries"][number];

export const columns: ColumnDef<TmsProofOfDelivery>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "filePath",
    header: "File Path",
  },
  {
    accessorKey: "latitude",
    header: "Latitude",
  },
  {
    accessorKey: "longitude",
    header: "Longitude",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
      const timestamp = row.getValue("timestamp") as string | null;
      if (!timestamp) return "-";
      return new Date(timestamp).toLocaleString();
    },
  },
  {
    accessorKey: "tripStop.shipment.trackingNumber",
    header: "Tracking Number",
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