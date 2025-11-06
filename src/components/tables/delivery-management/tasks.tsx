import { ColumnDef } from "@tanstack/react-table";
import { DeliveryManagementTasksResponse } from "@/lib/pb.types";

type TaskResponse = DeliveryManagementTasksResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "package",
		header: "Package ID",
	},
	{
		accessorKey: "route",
		header: "Route ID",
	},
	{
		accessorKey: "sequence",
		header: "Sequence",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as string;
			const colors: Record<string, string> = {
				pending: "bg-yellow-100 text-yellow-800",
				assigned: "bg-blue-100 text-blue-800",
				"out-for-delivery": "bg-purple-100 text-purple-800",
				delivered: "bg-green-100 text-green-800",
				failed: "bg-red-100 text-red-800",
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
		accessorKey: "deliveryAddress",
		header: "Delivery Address",
	},
	{
		accessorKey: "recipientName",
		header: "Recipient Name",
	},
	{
		accessorKey: "recipientPhone",
		header: "Recipient Phone",
	},
	{
		accessorKey: "estimatedArrivalTime",
		header: "Est. Arrival",
		cell: ({ row }) => {
			const date = row.getValue("estimatedArrivalTime") as string | undefined;
			return date ? new Date(date).toLocaleString() : "-";
		},
	},
	{
		accessorKey: "actualArrivalTime",
		header: "Actual Arrival",
		cell: ({ row }) => {
			const date = row.getValue("actualArrivalTime") as string | undefined;
			return date ? new Date(date).toLocaleString() : "-";
		},
	},
	{
		accessorKey: "deliveryTime",
		header: "Delivery Time",
		cell: ({ row }) => {
			const date = row.getValue("deliveryTime") as string | undefined;
			return date ? new Date(date).toLocaleString() : "-";
		},
	},
	{
		accessorKey: "failureReason",
		header: "Failure Reason",
		cell: ({ row }) => {
			const reason = row.getValue("failureReason") as string | undefined;
			return reason ? reason.replace(/-/g, " ") : "-";
		},
	},
	{
		accessorKey: "attempCount",
		header: "Attempts",
	},
	{
		accessorKey: "deliveryInstructions",
		header: "Instructions",
		cell: ({ row }) => {
			const instr = row.getValue("deliveryInstructions") as string | undefined;
			return instr ? instr.substring(0, 40) + "..." : "-";
		},
	},
] satisfies ColumnDef<TaskResponse>[];
