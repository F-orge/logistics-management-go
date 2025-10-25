import { ColumnDef } from "@tanstack/react-table";
import { TableDeliveryQuery } from "@packages/graphql/client/generated/graphql";

// Extract the delivery route type from the TableDeliveryRoute
type DeliveryRoute = NonNullable<
  TableDeliveryQuery["dms"]
>["deliveryRoutes"][number];

export const columns: ColumnDef<DeliveryRoute>[] = [
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
      return new Date(routeDate).toLocaleDateString();
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
    accessorKey: "driver.user.name",
    header: "Driver Name",
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
