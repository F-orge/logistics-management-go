import { ColumnDef } from "@tanstack/react-table";
import { TableProofOfDeliveryQuery } from "@packages/graphql/client/generated/graphql";

// Extract the proof of delivery type from the TableProofOfDeliveryQuery
type ProofOfDelivery = NonNullable<TableProofOfDeliveryQuery["dms"]>["dmsProofOfDeliveries"][number];

export const columns: ColumnDef<ProofOfDelivery>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "recipientName",
    header: "Recipient Name",
  },
  {
    accessorKey: "verificationCode",
    header: "Verification Code",
  },
  {
    accessorKey: "deliveryTask.package.packageNumber",
    header: "Package Number",
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
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string | null;
      if (!createdAt) return "-";
      return new Date(createdAt).toLocaleDateString();
    },
  },
];