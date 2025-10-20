import type { DbSchema } from "@packages/db";
import type { ColumnDef } from "@tanstack/react-table";
import type z from "zod";

export const columns: ColumnDef<
  z.infer<typeof DbSchema.shape.wms.shape.locations>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "warehouseId",
    header: "Warehouse ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
  },
  {
    accessorKey: "hazmatApproved",
    header: "Hazmat Approved",
  },
  {
    accessorKey: "isActive",
    header: "Is Active",
  },
  {
    accessorKey: "isPickable",
    header: "Is Pickable",
  },
  {
    accessorKey: "isReceivable",
    header: "Is Receivable",
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "maxPallets",
    header: "Max Pallets",
  },
  {
    accessorKey: "maxVolume",
    header: "Max Volume",
  },
  {
    accessorKey: "maxWeight",
    header: "Max Weight",
  },
  {
    accessorKey: "parentLocationId",
    header: "Parent Location ID",
  },
  {
    accessorKey: "path",
    header: "Path",
  },
  {
    accessorKey: "temperatureControlled",
    header: "Temperature Controlled",
  },
  {
    accessorKey: "xCoordinate",
    header: "X Coordinate",
  },
  {
    accessorKey: "yCoordinate",
    header: "Y Coordinate",
  },
  {
    accessorKey: "zCoordinate",
    header: "Z Coordinate",
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
