import { ColumnDef } from "@tanstack/react-table";
import { TransportManagementGeofenceEventsResponse } from "@/lib/pb.types";

type GeofenceEventResponse = TransportManagementGeofenceEventsResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "vehicle",
		header: "Vehicle ID",
	},
	{
		accessorKey: "geofence",
		header: "Geofence ID",
	},
	{
		accessorKey: "type",
		header: "Event Type",
		cell: ({ row }) => {
			const type = row.getValue("type") as string;
			const icons: Record<string, string> = {
				enter: "📍",
				exit: "🚀",
			};
			return (
				<span>
					{icons[type] || ""} {type.charAt(0).toUpperCase() + type.slice(1)}
				</span>
			);
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
] satisfies ColumnDef<GeofenceEventResponse>[];
