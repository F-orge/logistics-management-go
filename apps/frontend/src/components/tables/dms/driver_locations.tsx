import { ColumnDef } from "@tanstack/react-table";
import { TableDriverLocationQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the driver location type from the TableDriverLocationQuery
type DriverLocation = NonNullable<TableDriverLocationQuery["dms"]>["driverLocations"][number];

export const columns: ColumnDef<DriverLocation>[] = [
  {
    header: "Location Details",
    columns: [
      {
        accessorKey: "latitude",
        header: "Latitude",
      },
      {
        accessorKey: "longitude",
        header: "Longitude",
      },
      {
        accessorKey: "speedKmh",
        header: "Speed (km/h)",
      },
      {
        accessorKey: "accuracy",
        header: "Accuracy",
      },
      {
        accessorKey: "altitude",
        header: "Altitude",
      },
      {
        accessorKey: "heading",
        header: "Heading",
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
        accessorKey: "driver.licenseExpiryDate",
        header: "License Expiry Date",
        accessorFn: (row) => row.driver?.licenseExpiryDate,
        cell: ({ row }) => {
          const licenseExpiryDate = row.original.driver?.licenseExpiryDate;
          if (!licenseExpiryDate) return "-";
          return format(new Date(Number(licenseExpiryDate)), "PPP");
        },
      },
    ],
  },
];