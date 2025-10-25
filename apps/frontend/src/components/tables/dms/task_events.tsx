import { ColumnDef } from "@tanstack/react-table";
import { TableTaskEventQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the task event type from the TableTaskEventQuery
type TaskEvent = NonNullable<TableTaskEventQuery["dms"]>["taskEvents"][number];

export const columns: ColumnDef<TaskEvent>[] = [
  {
    header: "Task Event Details",
    columns: [
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "reason",
        header: "Reason",
      },
      {
        accessorKey: "notes",
        header: "Notes",
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
        accessorKey: "deliveryTask.deliveryInstructions",
        header: "Delivery Instructions",
        accessorFn: (row) => row.deliveryTask?.deliveryInstructions,
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
    ],
  },
];