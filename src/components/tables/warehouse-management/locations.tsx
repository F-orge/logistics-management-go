import { WarehouseManagementLocationsResponse } from "@/lib/pb.types";
import { ColumnDef } from "@tanstack/react-table";

type LocationResponse = WarehouseManagementLocationsResponse;

export default [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Location Name",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string | undefined;
      return type ? type.replace(/-/g, " ") : "-";
    },
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "maxWeight",
    header: "Max Weight",
  },
  {
    accessorKey: "maxVolume",
    header: "Max Volume",
  },
  {
    accessorKey: "maxPallets",
    header: "Max Pallets",
  },
  {
    accessorKey: "isPickable",
    header: "Pickable",
    cell: ({ row }) => {
      const isPickable = row.getValue("isPickable") as boolean | undefined;
      return isPickable ? "✓" : "✗";
    },
  },
  {
    accessorKey: "isReceivable",
    header: "Receivable",
    cell: ({ row }) => {
      const isReceivable = row.getValue("isReceivable") as boolean | undefined;
      return isReceivable ? "✓" : "✗";
    },
  },
  {
    accessorKey: "temperatureControlled",
    header: "Temperature Controlled",
    cell: ({ row }) => {
      const controlled = row.getValue("temperatureControlled") as boolean | undefined;
      return controlled ? (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
          Controlled
        </span>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "hazmatApproved",
    header: "Hazmat Approved",
    cell: ({ row }) => {
      const approved = row.getValue("hazmatApproved") as boolean | undefined;
      return approved ? (
        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm">
          Approved
        </span>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean | undefined;
      return isActive ? (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
          Active
        </span>
      ) : (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
          Inactive
        </span>
      );
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("created") as string;
      return new Date(date).toLocaleDateString();
    },
  },
] satisfies ColumnDef<LocationResponse>[];
