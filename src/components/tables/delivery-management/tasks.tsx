import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	formatDateTime,
	formatHyphens,
	statusBadgeCell,
	taskStatusColors,
	truncateText,
} from "@/components/utils";
import { DeliveryManagementTasksResponse } from "@/lib/pb.types";

type TaskResponse = DeliveryManagementTasksResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<TaskResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Task ID copied to clipboard");
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
		label: "Edit Task",
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
		label: "Delete Task",
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

export const columns: ColumnDef<TaskResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "package",
		header: "Package ID",
	},
	{
		accessorKey: "route",
		header: "Route ID",
	},
	{
		accessorKey: "sequence",
		header: "Sequence",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) =>
			statusBadgeCell(row.getValue("status") as string, taskStatusColors),
	},
	{
		accessorKey: "deliveryAddress",
		header: "Delivery Address",
	},
	{
		accessorKey: "recipientName",
		header: "Recipient Name",
	},
	{
		accessorKey: "recipientPhone",
		header: "Recipient Phone",
	},
	{
		accessorKey: "estimatedArrivalTime",
		header: "Est. Arrival",
		cell: ({ row }) =>
			formatDateTime(
				row.getValue("estimatedArrivalTime") as string | undefined,
			),
	},
	{
		accessorKey: "actualArrivalTime",
		header: "Actual Arrival",
		cell: ({ row }) =>
			formatDateTime(row.getValue("actualArrivalTime") as string | undefined),
	},
	{
		accessorKey: "deliveryTime",
		header: "Delivery Time",
		cell: ({ row }) =>
			formatDateTime(row.getValue("deliveryTime") as string | undefined),
	},
	{
		accessorKey: "failureReason",
		header: "Failure Reason",
		cell: ({ row }) =>
			formatHyphens(row.getValue("failureReason") as string | undefined),
	},
	{
		accessorKey: "attempCount",
		header: "Attempts",
	},
	{
		accessorKey: "deliveryInstructions",
		header: "Instructions",
		cell: ({ row }) =>
			truncateText(
				row.getValue("deliveryInstructions") as string | undefined,
				40,
			),
	},
];
