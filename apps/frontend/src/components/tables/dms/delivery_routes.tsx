import { ColumnDef } from "@tanstack/react-table";
import { TableDeliveryQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the delivery route type from the TableDeliveryRoute
export type DeliveryRoute = NonNullable<
  TableDeliveryQuery["dms"]
>["deliveryRoutes"][number];

export const columns: ColumnDef<DeliveryRoute>[] = [
  {
    header: "Route Details",
    columns: [
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "routeDate",
        header: "Route Date",
        cell: ({ row }) => {
          const routeDate = row.getValue("routeDate") as string | null;
          if (!routeDate) return "-";
          return format(new Date(Number(routeDate)), "PPP");
        },
      },
      {
        accessorKey: "totalDistanceKm",
        header: "Total Distance (km)",
      },
      {
        accessorKey: "estimatedDurationMinutes",
        header: "Estimated Duration (min)",
      },
      {
        accessorKey: "actualDurationMinutes",
        header: "Actual Duration (min)",
      },
      {
        accessorKey: "startedAt",
        header: "Started At",
        cell: ({ row }) => {
          const startedAt = row.getValue("startedAt") as string | null;
          if (!startedAt) return "-";
          return format(new Date(Number(startedAt)), "PPP");
        },
      },
      {
        accessorKey: "completedAt",
        header: "Completed At",
        cell: ({ row }) => {
          const completedAt = row.getValue("completedAt") as string | null;
          if (!completedAt) return "-";
          return format(new Date(Number(completedAt)), "PPP");
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
    id: "driver",
    header: "Driver Information",
    columns: [
      {
        accessorKey: "driver.user.name",
        header: "Name",
        accessorFn: (row) => row.driver?.user?.name,
      },
      {
        accessorKey: "driver.user.email",
        header: "Email",
        accessorFn: (row) => row.driver?.user?.email,
      },
      {
        accessorKey: "driver.contactPhone",
        header: "Phone",
        accessorFn: (row) => row.driver?.contactPhone,
      },
      {
        accessorKey: "driver.licenseNumber",
        header: "License Number",
        accessorFn: (row) => row.driver?.licenseNumber,
      },
      {
        accessorKey: "driver.status",
        header: "Status",
        accessorFn: (row) => row.driver?.status,
      },
    ],
  },
];
