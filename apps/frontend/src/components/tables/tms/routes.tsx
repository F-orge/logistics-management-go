import { ColumnDef } from "@tanstack/react-table";
import { TableRouteQuery } from "@packages/graphql/client/generated/graphql";

// Extract the route type from the TableRouteQuery
type Route = NonNullable<TableRouteQuery["tms"]>["routes"][number];

export const columns: ColumnDef<Route>[] = [
  {
    accessorKey: "trip.startLocation",
    header: "Start Location",
  },
  {
    accessorKey: "trip.endLocation",
    header: "End Location",
  },
  {
    accessorKey: "totalDistance",
    header: "Total Distance",
  },
  {
    accessorKey: "totalDuration",
    header: "Total Duration",
  },
  {
    accessorKey: "trip.driver.user.name",
    header: "Driver",
  },
];