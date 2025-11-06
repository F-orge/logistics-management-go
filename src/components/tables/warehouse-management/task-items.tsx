import { ColumnDef } from "@tanstack/react-table";
import { WarehouseManagementTaskItemsResponse } from "@/lib/pb.types";

type TaskItemResponse = WarehouseManagementTaskItemsResponse;

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
		accessorKey: "product",
		header: "Product ID",
	},
	{
		accessorKey: "sourceLocation",
		header: "Source Location",
	},
	{
		accessorKey: "destinationLocation",
		header: "Destination Location",
	},
	{
		accessorKey: "quantityRequired",
		header: "Quantity Required",
	},
	{
		accessorKey: "quantityCompleted",
		header: "Quantity Completed",
		cell: ({ row }) => {
			const completed = row.getValue("quantityCompleted") as number | undefined;
			return completed ?? "-";
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as string | undefined;
			const colors: Record<string, string> = {
				pending: "bg-yellow-100 text-yellow-800",
				"in-progress": "bg-blue-100 text-blue-800",
				completed: "bg-green-100 text-green-800",
				cancelled: "bg-red-100 text-red-800",
			};
			return (
				<span
					className={`px-2 py-1 rounded text-sm ${colors[status || ""] || ""}`}
				>
					{status || "-"}
				</span>
			);
		},
	},
	{
		accessorKey: "completedAt",
		header: "Completed At",
		cell: ({ row }) => {
			const date = row.getValue("completedAt") as string | undefined;
			return date ? new Date(date).toLocaleDateString() : "-";
		},
	},
	{
		accessorKey: "notes",
		header: "Notes",
		cell: ({ row }) => {
			const notes = row.getValue("notes") as string | undefined;
			return notes ? notes.substring(0, 50) + "..." : "-";
		},
	},
] satisfies ColumnDef<TaskItemResponse>[];
