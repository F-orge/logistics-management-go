import { ColumnDef } from "@tanstack/react-table";
import { WarehouseManagementStockTransferResponse } from "@/lib/pb.types";

type StockTransferResponse = WarehouseManagementStockTransferResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "product",
		header: "Product ID",
	},
	{
		accessorKey: "sourceWarehouse",
		header: "Source Warehouse",
	},
	{
		accessorKey: "destinationWarehouse",
		header: "Destination Warehouse",
	},
	{
		accessorKey: "quantity",
		header: "Quantity",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as string | undefined;
			const colors: Record<string, string> = {
				pending: "bg-yellow-100 text-yellow-800",
				"in-transit": "bg-blue-100 text-blue-800",
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
] satisfies ColumnDef<StockTransferResponse>[];
