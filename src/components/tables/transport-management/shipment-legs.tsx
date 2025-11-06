import { ColumnDef } from "@tanstack/react-table";
import { TransportManagementShipmentLegsResponse } from "@/lib/pb.types";

type ShipmentLegResponse = TransportManagementShipmentLegsResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "shipment",
		header: "Shipment ID",
	},
	{
		accessorKey: "carrier",
		header: "Carrier ID",
	},
	{
		accessorKey: "legSequence",
		header: "Sequence",
	},
	{
		accessorKey: "startLocation",
		header: "Start Location",
		cell: ({ row }) => {
			const coords = row.getValue("startLocation") as
				| { lon: number; lat: number }
				| undefined;
			return coords
				? `${coords.lat.toFixed(6)}, ${coords.lon.toFixed(6)}`
				: "-";
		},
	},
	{
		accessorKey: "endLocation",
		header: "End Location",
		cell: ({ row }) => {
			const coords = row.getValue("endLocation") as
				| { lon: number; lat: number }
				| undefined;
			return coords
				? `${coords.lat.toFixed(6)}, ${coords.lon.toFixed(6)}`
				: "-";
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as string;
			const colors: Record<string, string> = {
				pending: "bg-yellow-100 text-yellow-800",
				"in-transit": "bg-blue-100 text-blue-800",
				delivered: "bg-green-100 text-green-800",
				cancelled: "bg-red-100 text-red-800",
				failed: "bg-red-100 text-red-800",
			};
			return (
				<span className={`px-2 py-1 rounded text-sm ${colors[status] || ""}`}>
					{status.replace(/-/g, " ")}
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
] satisfies ColumnDef<ShipmentLegResponse>[];
