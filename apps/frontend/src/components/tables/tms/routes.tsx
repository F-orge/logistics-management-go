import { ColumnDef } from "@tanstack/react-table";
import { TableRouteQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the route type from the TableRouteQuery
type Route = NonNullable<TableRouteQuery["tms"]>["routes"][number];

export const columns: ColumnDef<Route>[] = [
  {
    header: "Route Details",
    columns: [
      {
        accessorKey: "totalDistance",
        header: "Total Distance",
      },
      {
        accessorKey: "totalDuration",
        header: "Total Duration",
      },
    ],
  },
  {
    id: "trip",
    header: "Trip Information",
    columns: [
      {
        accessorKey: "trip.startLocation",
        header: "Start Location",
        accessorFn: (row) => row.trip?.startLocation,
      },
      {
        accessorKey: "trip.endLocation",
        header: "End Location",
        accessorFn: (row) => row.trip?.endLocation,
      },
      {
        accessorKey: "trip.status",
        header: "Status",
        accessorFn: (row) => row.trip?.status,
      },
      {
        accessorKey: "trip.startTime",
        header: "Start Time",
        accessorFn: (row) => row.trip?.startTime,
        cell: ({ row }) => {
          const startTime = row.original.trip?.startTime;
          if (!startTime) return "-";
          return format(new Date(Number(startTime)), "PPP p");
        },
      },
      {
        accessorKey: "trip.endTime",
        header: "End Time",
        accessorFn: (row) => row.trip?.endTime,
        cell: ({ row }) => {
          const endTime = row.original.trip?.endTime;
          if (!endTime) return "-";
          return format(new Date(Number(endTime)), "PPP p");
        },
      },
      {
        accessorKey: "trip.createdAt",
        header: "Created At",
        accessorFn: (row) => row.trip?.createdAt,
        cell: ({ row }) => {
          const createdAt = row.original.trip?.createdAt;
          if (!createdAt) return "-";
          return format(new Date(Number(createdAt)), "PPP");
        },
      },
      {
        accessorKey: "trip.driver.user.name",
        header: "Driver Name",
        accessorFn: (row) => row.trip?.driver?.user?.name,
      },
      {
        accessorKey: "trip.driver.user.email",
        header: "Driver Email",
        accessorFn: (row) => row.trip?.driver?.user?.email,
      },
      {
        accessorKey: "trip.driver.contactPhone",
        header: "Driver Phone",
        accessorFn: (row) => row.trip?.driver?.contactPhone,
      },
      {
        accessorKey: "trip.driver.licenseNumber",
        header: "Driver License",
        accessorFn: (row) => row.trip?.driver?.licenseNumber,
      },
    ],
  },
];