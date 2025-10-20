import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.wms.shape.inboundShipments>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "clientId",
    header: "Client ID",
  },
  {
    accessorKey: "warehouseId",
    header: "Warehouse ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "expectedArrivalDate",
    header: "Expected Arrival Date",
  },
  {
    accessorKey: "actualArrivalDate",
    header: "Actual Arrival Date",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
