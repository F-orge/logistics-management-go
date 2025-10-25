import { ColumnDef } from "@tanstack/react-table";
import { TableDeliveryTaskQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the delivery task type from the TableDeliveryTaskQuery
type DeliveryTask = NonNullable<TableDeliveryTaskQuery["dms"]>["deliveryTasks"][number];

export const columns: ColumnDef<DeliveryTask>[] = [
  {
    header: "Task Details",
    columns: [
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "recipientName",
        header: "Recipient Name",
      },
      {
        accessorKey: "recipientPhone",
        header: "Recipient Phone",
      },
      {
        accessorKey: "deliveryAddress",
        header: "Delivery Address",
      },
      {
        accessorKey: "deliveryInstructions",
        header: "Delivery Instructions",
      },
      {
        accessorKey: "estimatedArrivalTime",
        header: "Estimated Arrival",
        cell: ({ row }) => {
          const estimatedArrivalTime = row.getValue("estimatedArrivalTime") as string | null;
          if (!estimatedArrivalTime) return "-";
          return format(new Date(Number(estimatedArrivalTime)), "PPP");
        },
      },
      {
        accessorKey: "actualArrivalTime",
        header: "Actual Arrival",
        cell: ({ row }) => {
          const actualArrivalTime = row.getValue("actualArrivalTime") as string | null;
          if (!actualArrivalTime) return "-";
          return format(new Date(Number(actualArrivalTime)), "PPP");
        },
      },
      {
        accessorKey: "failureReason",
        header: "Failure Reason",
      },
      {
        accessorKey: "attemptCount",
        header: "Attempt Count",
      },
      {
        accessorKey: "routeSequence",
        header: "Route Sequence",
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
    id: "package",
    header: "Package Information",
    columns: [
      {
        accessorKey: "package.packageNumber",
        header: "Package Number",
        accessorFn: (row) => row.package?.packageNumber,
      },
      {
        accessorKey: "package.trackingNumber",
        header: "Tracking Number",
        accessorFn: (row) => row.package?.trackingNumber,
      },
      {
        accessorKey: "package.carrier",
        header: "Carrier",
        accessorFn: (row) => row.package?.carrier,
      },
      {
        accessorKey: "package.warehouse.address",
        header: "Warehouse Address",
        accessorFn: (row) => row.package?.warehouse?.address,
      },
      {
        accessorKey: "package.warehouse.country",
        header: "Warehouse Country",
        accessorFn: (row) => row.package?.warehouse?.country,
      },
    ],
  },
  {
    id: "deliveryRoute",
    header: "Delivery Route Information",
    columns: [
      {
        accessorKey: "deliveryRoute.status",
        header: "Status",
        accessorFn: (row) => row.deliveryRoute?.status,
      },
      {
        accessorKey: "deliveryRoute.totalDistanceKm",
        header: "Total Distance (km)",
        accessorFn: (row) => row.deliveryRoute?.totalDistanceKm,
      },
      {
        accessorKey: "deliveryRoute.driver.user.name",
        header: "Driver Name",
        accessorFn: (row) => row.deliveryRoute?.driver?.user?.name,
      },
      {
        accessorKey: "deliveryRoute.driver.user.email",
        header: "Driver Email",
        accessorFn: (row) => row.deliveryRoute?.driver?.user?.email,
      },
      {
        accessorKey: "deliveryRoute.driver.contactPhone",
        header: "Driver Phone",
        accessorFn: (row) => row.deliveryRoute?.driver?.contactPhone,
      },
    ],
  },
];