import { ColumnDef } from "@tanstack/react-table";
import { DeliveryManagementTaskEventsResponse } from "@/lib/pb.types";

type TaskEventResponse = DeliveryManagementTaskEventsResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "task",
		header: "Task ID",
	},
	{
		accessorKey: "status",
		header: "Event Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as string;
			const colors: Record<string, string> = {
				assigned: "bg-blue-100 text-blue-800",
				started: "bg-blue-100 text-blue-800",
				arrived: "bg-purple-100 text-purple-800",
				delivered: "bg-green-100 text-green-800",
				failed: "bg-red-100 text-red-800",
				exception: "bg-orange-100 text-orange-800",
				cancelled: "bg-red-100 text-red-800",
				rescheduled: "bg-yellow-100 text-yellow-800",
			};
			return (
				<span className={`px-2 py-1 rounded text-sm ${colors[status] || ""}`}>
					{status.replace(/-/g, " ")}
				</span>
			);
		},
	},
	{
		accessorKey: "coordinates",
		header: "Location",
		cell: ({ row }) => {
			const coords = row.getValue("coordinates") as
				| { lon: number; lat: number }
				| undefined;
			return coords ? (
				<span className="font-mono text-sm">
					{coords.lat.toFixed(6)}, {coords.lon.toFixed(6)}
				</span>
			) : (
				"-"
			);
		},
	},
	{
		accessorKey: "notes",
		header: "Notes",
		cell: ({ row }) => {
			const notes = row.getValue("notes") as string | undefined;
			return notes ? notes.substring(0, 40) + "..." : "-";
		},
	},
	{
		accessorKey: "reason",
		header: "Reason",
		cell: ({ row }) => {
			const reason = row.getValue("reason") as string | undefined;
			return reason ? reason.substring(0, 40) + "..." : "-";
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
] satisfies ColumnDef<TaskEventResponse>[];
