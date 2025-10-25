import { ColumnDef } from "@tanstack/react-table";
import { TableTmsProofOfDeliveryQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the proof of delivery type from the TableTmsProofOfDeliveryQuery
type TmsProofOfDelivery = NonNullable<TableTmsProofOfDeliveryQuery["tms"]>["proofOfDeliveries"][number];

export const columns: ColumnDef<TmsProofOfDelivery>[] = [
  {
    header: "Proof of Delivery Details",
    columns: [
      {
        accessorKey: "type",
        header: "Type",
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
    id: "tripStop",
    header: "Trip Stop Information",
    columns: [
      {
        accessorKey: "tripStop.status",
        header: "Status",
        accessorFn: (row) => row.tripStop?.status,
      },
      {
        accessorKey: "tripStop.address",
        header: "Address",
        accessorFn: (row) => row.tripStop?.address,
      },
      {
        accessorKey: "tripStop.actualArrivalTime",
        header: "Actual Arrival Time",
        accessorFn: (row) => row.tripStop?.actualArrivalTime,
        cell: ({ row }) => {
          const actualArrivalTime = row.original.tripStop?.actualArrivalTime;
          if (!actualArrivalTime) return "-";
          return format(new Date(Number(actualArrivalTime)), "PPP p");
        },
      },
      {
        accessorKey: "tripStop.actualDepartureTime",
        header: "Actual Departure Time",
        accessorFn: (row) => row.tripStop?.actualDepartureTime,
        cell: ({ row }) => {
          const actualDepartureTime = row.original.tripStop?.actualDepartureTime;
          if (!actualDepartureTime) return "-";
          return format(new Date(Number(actualDepartureTime)), "PPP p");
        },
      },
      {
        accessorKey: "tripStop.shipment.trackingNumber",
        header: "Tracking Number",
        accessorFn: (row) => row.tripStop?.shipment?.trackingNumber,
      },
      {
        accessorKey: "tripStop.shipment.carrier",
        header: "Carrier",
        accessorFn: (row) => row.tripStop?.shipment?.carrier,
      },
      {
        accessorKey: "tripStop.shipment.status",
        header: "Shipment Status",
        accessorFn: (row) => row.tripStop?.shipment?.status,
      },
      {
        accessorKey: "tripStop.trip.startLocation",
        header: "Trip Start Location",
        accessorFn: (row) => row.tripStop?.trip?.startLocation,
      },
      {
        accessorKey: "tripStop.trip.endLocation",
        header: "Trip End Location",
        accessorFn: (row) => row.tripStop?.trip?.endLocation,
      },
      {
        accessorKey: "tripStop.trip.status",
        header: "Trip Status",
        accessorFn: (row) => row.tripStop?.trip?.status,
      },
      {
        accessorKey: "tripStop.trip.vehicle.registrationNumber",
        header: "Vehicle Registration",
        accessorFn: (row) => row.tripStop?.trip?.vehicle?.registrationNumber,
      },
      {
        accessorKey: "tripStop.trip.vehicle.make",
        header: "Vehicle Make",
        accessorFn: (row) => row.tripStop?.trip?.vehicle?.make,
      },
      {
        accessorKey: "tripStop.trip.vehicle.model",
        header: "Vehicle Model",
        accessorFn: (row) => row.tripStop?.trip?.vehicle?.model,
      },
      {
        accessorKey: "tripStop.trip.vehicle.year",
        header: "Vehicle Year",
        accessorFn: (row) => row.tripStop?.trip?.vehicle?.year,
      },
      {
        accessorKey: "tripStop.trip.vehicle.vin",
        header: "Vehicle VIN",
        accessorFn: (row) => row.tripStop?.trip?.vehicle?.vin,
      },
    ],
  },
];