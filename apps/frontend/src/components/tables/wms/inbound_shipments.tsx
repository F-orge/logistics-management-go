import { ColumnDef } from "@tanstack/react-table";
import { TableInboundShipmentQuery } from "@packages/graphql/client/generated/graphql";
import { format } from "date-fns";

// Extract the inbound shipment type from the TableInboundShipmentQuery
type InboundShipment = NonNullable<TableInboundShipmentQuery["wms"]>["inboundShipments"][number];

export const columns: ColumnDef<InboundShipment>[] = [
  {
    header: "Shipment Details",
    columns: [
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "expectedArrivalDate",
        header: "Expected Arrival Date",
        cell: ({ row }) => {
          const expectedArrivalDate = row.getValue("expectedArrivalDate") as string | null;
          if (!expectedArrivalDate) return "-";
          return format(new Date(Number(expectedArrivalDate)), "PPP");
        },
      },
      {
        accessorKey: "actualArrivalDate",
        header: "Actual Arrival Date",
        cell: ({ row }) => {
          const actualArrivalDate = row.getValue("actualArrivalDate") as string | null;
          if (!actualArrivalDate) return "-";
          return format(new Date(Number(actualArrivalDate)), "PPP");
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
    id: "client",
    header: "Client Information",
    columns: [
      {
        accessorKey: "client.name",
        header: "Name",
        accessorFn: (row) => row.client?.name,
      },
      {
        accessorKey: "client.industry",
        header: "Industry",
        accessorFn: (row) => row.client?.industry,
      },
      {
        accessorKey: "client.phoneNumber",
        header: "Phone Number",
        accessorFn: (row) => row.client?.phoneNumber,
      },
      {
        accessorKey: "client.country",
        header: "Country",
        accessorFn: (row) => row.client?.country,
      },
      {
        accessorKey: "client.website",
        header: "Website",
        accessorFn: (row) => row.client?.website,
      },
    ],
  },
];