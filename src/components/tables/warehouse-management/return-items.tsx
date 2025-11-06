import { ColumnDef } from "@tanstack/react-table";
import { WarehouseManagementReturnItemsResponse } from "@/lib/pb.types";

type ReturnItemResponse = WarehouseManagementReturnItemsResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "return",
		header: "Return ID",
	},
	{
		accessorKey: "product",
		header: "Product ID",
	},
	{
		accessorKey: "quantityExpected",
		header: "Expected Quantity",
	},
	{
		accessorKey: "quantityRecevied",
		header: "Received Quantity",
	},
	{
		accessorKey: "condition",
		header: "Condition",
		cell: ({ row }) => {
			const condition = row.getValue("condition") as string | undefined;
			const colors: Record<string, string> = {
				"like-new": "bg-green-100 text-green-800",
				good: "bg-green-100 text-green-800",
				fair: "bg-yellow-100 text-yellow-800",
				damaged: "bg-red-100 text-red-800",
			};
			return (
				<span
					className={`px-2 py-1 rounded text-sm ${colors[condition || ""] || ""}`}
				>
					{condition || "-"}
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
] satisfies ColumnDef<ReturnItemResponse>[];
