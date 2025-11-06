import { ColumnDef } from "@tanstack/react-table";
import { TransportManagementDriverSchedulesResponse } from "@/lib/pb.types";

type DriverScheduleResponse = TransportManagementDriverSchedulesResponse;

export default [
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
		cell: ({ row }) => {
			const date = row.getValue("startDate") as string;
			return new Date(date).toLocaleDateString();
		},
	},
	{
		accessorKey: "endDate",
		header: "End Date",
		cell: ({ row }) => {
			const date = row.getValue("endDate") as string;
			return new Date(date).toLocaleDateString();
		},
	},
	{
		accessorKey: "reason",
		header: "Reason",
		cell: ({ row }) => {
			const reason = row.getValue("reason") as string | undefined;
			return reason ? reason.replace(/-/g, " ") : "-";
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
] satisfies ColumnDef<DriverScheduleResponse>[];
