import { ColumnDef } from "@tanstack/react-table";
import { TransportManagementShipmentLegEventsResponse } from "@/lib/pb.types";

type ShipmentLegEventResponse = TransportManagementShipmentLegEventsResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "shipmentLegId",
		header: "Shipment Leg ID",
	},
	{
		accessorKey: "message",
		header: "Message",
		cell: ({ row }) => {
			const message = row.getValue("message") as string;
			return message.substring(0, 50) + (message.length > 50 ? "..." : "");
		},
	},
	{
		accessorKey: "location",
		header: "Location",
		cell: ({ row }) => {
			const coords = row.getValue("location") as
				| { lon: number; lat: number }
				| undefined;
			return coords
				? `${coords.lat.toFixed(6)}, ${coords.lon.toFixed(6)}`
				: "-";
		},
	},
	{
		accessorKey: "timestamp",
		header: "Timestamp",
		cell: ({ row }) => {
			const date = row.getValue("timestamp") as string;
			return new Date(date).toLocaleString();
		},
	},
] satisfies ColumnDef<ShipmentLegEventResponse>[];
