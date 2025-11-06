import { ColumnDef } from "@tanstack/react-table";
import { WarehouseManagementInboundShipmentsResponse } from "@/lib/pb.types";

type InboundShipmentResponse = WarehouseManagementInboundShipmentsResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "warehouse",
		header: "Warehouse ID",
	},
	{
		accessorKey: "client",
		header: "Client ID",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as string | undefined;
			const colors: Record<string, string> = {
				pending: "bg-yellow-100 text-yellow-800",
				"in-progress": "bg-blue-100 text-blue-800",
				received: "bg-green-100 text-green-800",
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
		accessorKey: "expectedArrivalDate",
		header: "Expected Arrival",
		cell: ({ row }) => {
			const date = row.getValue("expectedArrivalDate") as string | undefined;
			return date ? new Date(date).toLocaleDateString() : "-";
		},
	},
	{
		accessorKey: "actualArrivalDate",
		header: "Actual Arrival",
		cell: ({ row }) => {
			const date = row.getValue("actualArrivalDate") as string | undefined;
			return date ? new Date(date).toLocaleDateString() : "-";
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
] satisfies ColumnDef<InboundShipmentResponse>[];
