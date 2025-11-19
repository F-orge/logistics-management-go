import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	formatDate,
	formatLocationType,
	pickBatchStatusColors,
	statusBadgeCell,
} from "@/components/utils";
import { WarehouseManagementPickBatchesResponse } from "@/lib/pb.types";

type PickBatchResponse = WarehouseManagementPickBatchesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<PickBatchResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Pick Batch ID copied to clipboard");
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
		label: "Edit Pick Batch",
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
		label: "Delete Pick Batch",
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

export const columns: ColumnDef<PickBatchResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "batchNumber",
		header: "Batch Number",
	},
	{
		accessorKey: "warehouse",
		header: "Warehouse ID",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) =>
			statusBadgeCell(row.getValue("status") as string, pickBatchStatusColors),
	},
	{
		accessorKey: "strategy",
		header: "Strategy",
		cell: ({ row }) => formatLocationType(row.getValue("strategy") as string),
	},
	{
		accessorKey: "priority",
		header: "Priority",
	},
	{
		accessorKey: "totalItems",
		header: "Total Items",
	},
	{
		accessorKey: "completedItems",
		header: "Completed Items",
	},
	{
		accessorKey: "estimatedDuration",
		header: "Estimated (min)",
		cell: ({ row }) => {
			const duration = row.getValue("estimatedDuration") as number | undefined;
			return duration ? `${duration}` : "-";
		},
	},
	{
		accessorKey: "actualDuration",
		header: "Actual (min)",
		cell: ({ row }) => {
			const duration = row.getValue("actualDuration") as number | undefined;
			return duration ? `${duration}` : "-";
		},
	},
	{
		accessorKey: "startedAt",
		header: "Started At",
		cell: ({ row }) => {
			const date = row.getValue("startedAt") as string | undefined;
			return date ? formatDate(date) : "-";
		},
	},
	{
		accessorKey: "completedAt",
		header: "Completed At",
		cell: ({ row }) => {
			const date = row.getValue("completedAt") as string | undefined;
			return date ? formatDate(date) : "-";
		},
	},
];
