import { ColumnDef } from "@tanstack/react-table";
import { WarehouseManagementTasksResponse } from "@/lib/pb.types";

type TaskResponse = WarehouseManagementTasksResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "taskNumber",
		header: "Task Number",
	},
	{
		accessorKey: "warehouse",
		header: "Warehouse ID",
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
		accessorKey: "priority",
		header: "Priority",
	},
	{
		accessorKey: "user",
		header: "Assigned User",
	},
	{
		accessorKey: "startTime",
		header: "Start Time",
		cell: ({ row }) => {
			const date = row.getValue("startTime") as string | undefined;
			return date ? new Date(date).toLocaleDateString() : "-";
		},
	},
	{
		accessorKey: "endTime",
		header: "End Time",
		cell: ({ row }) => {
			const date = row.getValue("endTime") as string | undefined;
			return date ? new Date(date).toLocaleDateString() : "-";
		},
	},
	{
		accessorKey: "instructions",
		header: "Instructions",
		cell: ({ row }) => {
			const instr = row.getValue("instructions") as string | undefined;
			return instr ? instr.substring(0, 50) + "..." : "-";
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
] satisfies ColumnDef<TaskResponse>[];
