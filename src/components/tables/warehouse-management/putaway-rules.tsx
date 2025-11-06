import { ColumnDef } from "@tanstack/react-table";
import { WarehouseManagementPutawayRulesResponse } from "@/lib/pb.types";

type PutawayRuleResponse = WarehouseManagementPutawayRulesResponse;

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
		accessorKey: "warehouse",
		header: "Warehouse ID",
	},
	{
		accessorKey: "locationType",
		header: "Location Type",
		cell: ({ row }) => {
			const type = row.getValue("locationType") as string;
			return type.replace(/-/g, " ");
		},
	},
	{
		accessorKey: "priority",
		header: "Priority",
	},
	{
		accessorKey: "minQuantity",
		header: "Min Quantity",
	},
	{
		accessorKey: "maxQuantity",
		header: "Max Quantity",
	},
	{
		accessorKey: "weightThreshold",
		header: "Weight Threshold",
	},
	{
		accessorKey: "volumeThreshold",
		header: "Volume Threshold",
	},
	{
		accessorKey: "preferredLocation",
		header: "Preferred Location",
	},
	{
		accessorKey: "requireTemperatureControl",
		header: "Temp Control",
		cell: ({ row }) => {
			const required = row.getValue("requireTemperatureControl") as
				| boolean
				| undefined;
			return required ? "✓" : "-";
		},
	},
	{
		accessorKey: "requireHazmatApproval",
		header: "Hazmat Approval",
		cell: ({ row }) => {
			const required = row.getValue("requireHazmatApproval") as
				| boolean
				| undefined;
			return required ? "✓" : "-";
		},
	},
	{
		accessorKey: "isActive",
		header: "Active",
		cell: ({ row }) => {
			const isActive = row.getValue("isActive") as boolean | undefined;
			return isActive ? (
				<span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
					Active
				</span>
			) : (
				"-"
			);
		},
	},
] satisfies ColumnDef<PutawayRuleResponse>[];
