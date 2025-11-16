import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	formatDate,
	formatLocationType,
	statusBadgeCell,
	truncateText,
	warehouseTaskStatusColors,
} from "@/components/utils";
import { WarehouseManagementTasksResponse } from "@/lib/pb.types";

type TaskResponse = WarehouseManagementTasksResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<TaskResponse>[] = [
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
		accessorKey: "taskNumber",
		header: "Task Number",
	},
	{
		accessorKey: "warehouse",
		header: "Warehouse ID",
	},
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ row }) => formatLocationType(row.getValue("type") as string),
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
		accessorKey: "priority",
		header: "Priority",
	},
	{
		accessorKey: "user",
		header: "Assigned User",
	},
	{
		accessorKey: "startTime",
		header: "Start Time",
		cell: ({ row }) => {
			const date = row.getValue("startTime") as string | undefined;
			return date ? formatDate(date) : "-";
		},
	},
	{
		accessorKey: "endTime",
		header: "End Time",
		cell: ({ row }) => {
			const date = row.getValue("endTime") as string | undefined;
			return date ? formatDate(date) : "-";
		},
	},
	{
		accessorKey: "instructions",
		header: "Instructions",
		cell: ({ row }) => {
			const instr = row.getValue("instructions") as string | undefined;
			return instr ? truncateText(instr, 50) : "-";
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
