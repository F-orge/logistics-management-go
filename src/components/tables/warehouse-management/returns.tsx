import { ColumnDef } from "@tanstack/react-table";
import { WarehouseManagementReturnsResponse } from "@/lib/pb.types";

type ReturnResponse = WarehouseManagementReturnsResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "returnNumber",
		header: "Return Number",
	},
	{
		accessorKey: "salesOrder",
		header: "Sales Order ID",
	},
	{
		accessorKey: "client",
		header: "Client ID",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as string;
			const colors: Record<string, string> = {
				pending: "bg-yellow-100 text-yellow-800",
				"in-progress": "bg-blue-100 text-blue-800",
				completed: "bg-green-100 text-green-800",
				cancelled: "bg-red-100 text-red-800",
			};
			return (
				<span className={`px-2 py-1 rounded text-sm ${colors[status] || ""}`}>
					{status}
				</span>
			);
		},
	},
	{
		accessorKey: "reason",
		header: "Reason",
		cell: ({ row }) => {
			const reason = row.getValue("reason") as string | undefined;
			return reason ? reason.substring(0, 50) + "..." : "-";
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
	{
		accessorKey: "updated",
		header: "Updated",
		cell: ({ row }) => {
			const date = row.getValue("updated") as string;
			return new Date(date).toLocaleDateString();
		},
	},
] satisfies ColumnDef<ReturnResponse>[];
