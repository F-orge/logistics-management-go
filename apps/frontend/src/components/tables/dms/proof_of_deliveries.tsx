import { ColumnDef } from "@tanstack/react-table";
import { TableProofOfDeliveryQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the proof of delivery type from the TableProofOfDeliveryQuery
export type ProofOfDelivery = NonNullable<
  TableProofOfDeliveryQuery["dms"]
>["dmsProofOfDeliveries"][number];

export const columns: ColumnDef<ProofOfDelivery>[] = [
  {
    header: "Proof of Delivery Details",
    columns: [
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
          return format(new Date(Number(timestamp)), "PPP p");
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
          const createdAt = row.getValue("createdAt") as string | null;
          if (!createdAt) return "-";
          return format(new Date(Number(createdAt)), "PPP");
        },
      },
    ],
  },
  {
    id: "deliveryTask",
    header: "Delivery Task Information",
    columns: [
      {
        accessorKey: "deliveryTask.status",
        header: "Status",
        accessorFn: (row) => row.deliveryTask?.status,
      },
      {
        accessorKey: "deliveryTask.recipientName",
        header: "Recipient Name",
        accessorFn: (row) => row.deliveryTask?.recipientName,
      },
      {
        accessorKey: "deliveryTask.recipientPhone",
        header: "Recipient Phone",
        accessorFn: (row) => row.deliveryTask?.recipientPhone,
      },
      {
        accessorKey: "deliveryTask.deliveryAddress",
        header: "Delivery Address",
        accessorFn: (row) => row.deliveryTask?.deliveryAddress,
      },
      {
        accessorKey: "deliveryTask.actualArrivalTime",
        header: "Actual Arrival Time",
        accessorFn: (row) => row.deliveryTask?.actualArrivalTime,
        cell: ({ row }) => {
          const actualArrivalTime =
            row.original.deliveryTask?.actualArrivalTime;
          if (!actualArrivalTime) return "-";
          return format(new Date(Number(actualArrivalTime)), "PPP p");
        },
      },
      {
        accessorKey: "deliveryTask.failureReason",
        header: "Failure Reason",
        accessorFn: (row) => row.deliveryTask?.failureReason,
      },
      {
        accessorKey: "deliveryTask.package.packageNumber",
        header: "Package Number",
        accessorFn: (row) => row.deliveryTask?.package?.packageNumber,
      },
      {
        accessorKey: "deliveryTask.package.trackingNumber",
        header: "Tracking Number",
        accessorFn: (row) => row.deliveryTask?.package?.trackingNumber,
      },
      {
        accessorKey: "deliveryTask.package.packageType",
        header: "Package Type",
        accessorFn: (row) => row.deliveryTask?.package?.packageType,
      },
      {
        accessorKey: "deliveryTask.package.requiresSignature",
        header: "Requires Signature",
        accessorFn: (row) =>
          row.deliveryTask?.package?.requiresSignature ? "Yes" : "No",
      },
      {
        accessorKey: "deliveryTask.package.warehouse.address",
        header: "Warehouse Address",
        accessorFn: (row) => row.deliveryTask?.package?.warehouse?.address,
      },
      {
        accessorKey: "deliveryTask.package.warehouse.city",
        header: "Warehouse City",
        accessorFn: (row) => row.deliveryTask?.package?.warehouse?.city,
      },
      {
        accessorKey: "deliveryTask.package.warehouse.country",
        header: "Warehouse Country",
        accessorFn: (row) => row.deliveryTask?.package?.warehouse?.country,
      },
    ],
  },
];
