import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatDate, statusBadgeCell } from "@/components/utils";
import { WarehouseManagementBinThresholdResponse } from "@/lib/pb.types";

type BinThresholdResponse = WarehouseManagementBinThresholdResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<BinThresholdResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Bin Threshold ID copied to clipboard");
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
		label: "Edit Bin Threshold",
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
		label: "Delete Bin Threshold",
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

const activeStatusColors: Record<string, string> = {
	true: "bg-green-100 text-green-800",
	false: "bg-gray-100 text-gray-800",
};

export const columns: ColumnDef<BinThresholdResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "product",
		header: "Product ID",
	},
	{
		accessorKey: "location",
		header: "Location ID",
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
		accessorKey: "reorderQuantity",
		header: "Reorder Quantity",
	},
	{
		accessorKey: "alertThreshold",
		header: "Alert Threshold",
	},
	{
		accessorKey: "isActive",
		header: "Active",
		cell: ({ row }) => {
			const isActive = row.getValue("isActive") as boolean | undefined;
			const status = isActive ? "Active" : "Inactive";
			const colors = activeStatusColors[String(isActive ?? false)];
			return statusBadgeCell(status, { [status]: colors });
		},
	},
	{
		accessorKey: "created",
		header: "Created",
		cell: ({ row }) => formatDate(row.getValue("created") as string),
	},
	{
		accessorKey: "updated",
		header: "Updated",
		cell: ({ row }) => formatDate(row.getValue("updated") as string),
	},
];
