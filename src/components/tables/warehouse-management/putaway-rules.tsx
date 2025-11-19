import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	booleanBadgeCell,
	formatLocationType,
	statusBadgeCell,
} from "@/components/utils";
import { WarehouseManagementPutawayRulesResponse } from "@/lib/pb.types";

type PutawayRuleResponse = WarehouseManagementPutawayRulesResponse;

const activeStatusColors: Record<string, string> = {
	Active: "bg-green-100 text-green-800",
	Inactive: "bg-gray-100 text-gray-800",
};

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<PutawayRuleResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Putaway Rule ID copied to clipboard");
		},
	},
	{
		label: "Share Via QR Code",
		icon: <QrCode />,
		onSelect: (row, navigate) =>
			navigate({
				search: (prev) => ({ ...prev, action: "share", id: row.original.id }),
			}),
		divider: true,
	},
	{
		label: "Edit Putaway Rule",
		icon: <EditIcon />,
		onSelect: (row, navigate) =>
			navigate({
				search: (prev) => ({
					...prev,
					action: "update",
					id: row.original.id,
				}),
			}),
		divider: true,
	},
	{
		label: "Delete Putaway Rule",
		variant: "destructive",
		icon: <Trash />,
		onSelect: (row, navigate) =>
			navigate({
				search: (prev) => ({
					...prev,
					action: "delete",
					id: row.original.id,
				}),
			}),
	},
];

export const columns: ColumnDef<PutawayRuleResponse>[] = [
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
		cell: ({ row }) =>
			formatLocationType(row.getValue("locationType") as string),
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
		cell: ({ row }) =>
			booleanBadgeCell(
				row.getValue("requireTemperatureControl") as boolean | undefined,
			),
	},
	{
		accessorKey: "requireHazmatApproval",
		header: "Hazmat Approval",
		cell: ({ row }) =>
			booleanBadgeCell(
				row.getValue("requireHazmatApproval") as boolean | undefined,
			),
	},
	{
		accessorKey: "isActive",
		header: "Active",
		cell: ({ row }) => {
			const isActive = row.getValue("isActive") as boolean | undefined;
			const status = isActive ? "Active" : "Inactive";
			return statusBadgeCell(status, activeStatusColors);
		},
	},
];
