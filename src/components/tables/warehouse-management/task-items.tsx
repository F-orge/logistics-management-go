import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	formatDate,
	statusBadgeCell,
	truncateText,
	warehouseTaskStatusColors,
} from "@/components/utils";
import { WarehouseManagementTaskItemsResponse } from "@/lib/pb.types";

type TaskItemResponse = WarehouseManagementTaskItemsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<TaskItemResponse>[] = [
	{
		label: "Edit Task Item",
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
		label: "Delete Task Item",
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

export const columns: ColumnDef<TaskItemResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "task",
		header: "Task ID",
	},
	{
		accessorKey: "product",
		header: "Product ID",
	},
	{
		accessorKey: "sourceLocation",
		header: "Source Location",
	},
	{
		accessorKey: "destinationLocation",
		header: "Destination Location",
	},
	{
		accessorKey: "quantityRequired",
		header: "Quantity Required",
	},
	{
		accessorKey: "quantityCompleted",
		header: "Quantity Completed",
		cell: ({ row }) => {
			const completed = row.getValue("quantityCompleted") as number | undefined;
			return completed ?? "-";
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) =>
			statusBadgeCell(
				row.getValue("status") as string,
				warehouseTaskStatusColors,
			),
	},
	{
		accessorKey: "completedAt",
		header: "Completed At",
		cell: ({ row }) => {
			const date = row.getValue("completedAt") as string | undefined;
			return date ? formatDate(date) : "-";
		},
	},
	{
		accessorKey: "notes",
		header: "Notes",
		cell: ({ row }) => {
			const notes = row.getValue("notes") as string | undefined;
			return notes ? truncateText(notes, 50) : "-";
		},
	},
];
