import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatDate, formatHyphens } from "@/components/utils";
import { TransportManagementDriverSchedulesResponse } from "@/lib/pb.types";

type DriverScheduleResponse = TransportManagementDriverSchedulesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<DriverScheduleResponse>[] = [
	{
		label: "Edit Driver Schedule",
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
		label: "Delete Driver Schedule",
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

export const columns: ColumnDef<DriverScheduleResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "driver",
		header: "Driver ID",
	},
	{
		accessorKey: "startDate",
		header: "Start Date",
		cell: ({ row }) => formatDate(row.getValue("startDate") as string),
	},
	{
		accessorKey: "endDate",
		header: "End Date",
		cell: ({ row }) => formatDate(row.getValue("endDate") as string),
	},
	{
		accessorKey: "reason",
		header: "Reason",
		cell: ({ row }) =>
			formatHyphens(row.getValue("reason") as string | undefined),
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
