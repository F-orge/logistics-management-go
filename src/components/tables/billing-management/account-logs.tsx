import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	logSyncStatusColors,
	statusBadgeCell,
	truncateText,
} from "@/components/utils";
import { BillingManagementLogsResponse } from "@/lib/pb.types";

type LogResponse = BillingManagementLogsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<LogResponse>[] = [
	{
		label: "Edit Log",
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
		label: "Delete Log",
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

export const columns: ColumnDef<LogResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "externalSystem",
		header: "External System",
	},
	{
		accessorKey: "recordType",
		header: "Record Type",
	},
	{
		accessorKey: "recordId",
		header: "Record ID",
	},
	{
		accessorKey: "externalId",
		header: "External ID",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) =>
			statusBadgeCell(row.getValue("status") as string, logSyncStatusColors),
	},
	{
		accessorKey: "retryCount",
		header: "Retry Count",
	},
	{
		accessorKey: "errorMessage",
		header: "Error",
		cell: ({ row }) => truncateText(row.getValue("errorMessage") as string, 40),
	},
	{
		accessorKey: "lastSyncAt",
		header: "Last Sync",
		cell: ({ row }) => {
			const date = row.getValue("lastSyncAt") as string | undefined;
			return date ? new Date(date).toLocaleString() : "-";
		},
	},
	{
		accessorKey: "nextRetryAt",
		header: "Next Retry",
		cell: ({ row }) => {
			const date = row.getValue("nextRetryAt") as string | undefined;
			return date ? new Date(date).toLocaleString() : "-";
		},
	},
	{
		accessorKey: "created",
		header: "Created",
		cell: ({ row }) => {
			const date = row.getValue("created") as string;
			return new Date(date).toLocaleString();
		},
	},
];
