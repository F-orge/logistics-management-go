import { ColumnDef } from "@tanstack/react-table";
import { DeliveryManagementRoutesResponse } from "@/lib/pb.types";

type RouteResponse = DeliveryManagementRoutesResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "driver",
		header: "Driver ID",
	},
	{
		accessorKey: "routeDate",
		header: "Route Date",
		cell: ({ row }) => {
			const date = row.getValue("routeDate") as string | undefined;
			return date ? new Date(date).toLocaleDateString() : "-";
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as string | undefined;
			const colors: Record<string, string> = {
				planned: "bg-gray-100 text-gray-800",
				"in-progress": "bg-blue-100 text-blue-800",
				completed: "bg-green-100 text-green-800",
				cancelled: "bg-red-100 text-red-800",
				paused: "bg-yellow-100 text-yellow-800",
			};
			return (
				<span
					className={`px-2 py-1 rounded text-sm ${colors[status || ""] || ""}`}
				>
					{status ? status.replace(/-/g, " ") : "-"}
				</span>
			);
		},
	},
	{
		accessorKey: "totalDistance",
		header: "Distance (km)",
	},
	{
		accessorKey: "estimatedDurationInMinutes",
		header: "Est. Duration (min)",
	},
	{
		accessorKey: "startedAt",
		header: "Started At",
		cell: ({ row }) => {
			const date = row.getValue("startedAt") as string | undefined;
			return date ? new Date(date).toLocaleString() : "-";
		},
	},
	{
		accessorKey: "completedAt",
		header: "Completed At",
		cell: ({ row }) => {
			const date = row.getValue("completedAt") as string | undefined;
			return date ? new Date(date).toLocaleString() : "-";
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
] satisfies ColumnDef<RouteResponse>[];
