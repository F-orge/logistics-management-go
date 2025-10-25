import { ColumnDef } from "@tanstack/react-table";
import { TableInboundShipmentQuery } from "@packages/graphql/client/generated/graphql";

// Extract the inbound shipment type from the TableInboundShipmentQuery
type InboundShipment = NonNullable<TableInboundShipmentQuery["wms"]>["inboundShipments"][number];

export const columns: ColumnDef<InboundShipment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "client.name",
    header: "Client Name",
  },
  {
    accessorKey: "expectedArrivalDate",
    header: "Expected Arrival Date",
    cell: ({ row }) => {
      const expectedArrivalDate = row.getValue("expectedArrivalDate") as string | null;
      if (!expectedArrivalDate) return "-";
      return new Date(expectedArrivalDate).toLocaleDateString();
    },
  },
  {
    accessorKey: "actualArrivalDate",
    header: "Actual Arrival Date",
    cell: ({ row }) => {
      const actualArrivalDate = row.getValue("actualArrivalDate") as string | null;
      if (!actualArrivalDate) return "-";
      return new Date(actualArrivalDate).toLocaleDateString();
    },
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