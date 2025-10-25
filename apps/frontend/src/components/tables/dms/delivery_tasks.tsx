import { ColumnDef } from "@tanstack/react-table";
import { TableDeliveryTaskQuery } from "@packages/graphql/client/generated/graphql";

// Extract the delivery task type from the TableDeliveryTaskQuery
type DeliveryTask = NonNullable<TableDeliveryTaskQuery["dms"]>["deliveryTasks"][number];

export const columns: ColumnDef<DeliveryTask>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "recipientName",
    header: "Recipient Name",
  },
  {
    accessorKey: "deliveryAddress",
    header: "Delivery Address",
  },
  {
    accessorKey: "estimatedArrivalTime",
    header: "Estimated Arrival",
    cell: ({ row }) => {
      const estimatedArrivalTime = row.getValue("estimatedArrivalTime") as string | null;
      if (!estimatedArrivalTime) return "-";
      return new Date(estimatedArrivalTime).toLocaleDateString();
    },
  },
  {
    accessorKey: "actualArrivalTime",
    header: "Actual Arrival",
    cell: ({ row }) => {
      const actualArrivalTime = row.getValue("actualArrivalTime") as string | null;
      if (!actualArrivalTime) return "-";
      return new Date(actualArrivalTime).toLocaleDateString();
    },
  },
  {
    accessorKey: "package.packageNumber",
    header: "Package Number",
  },
  {
    accessorKey: "deliveryRoute.driver.user.name",
    header: "Driver",
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