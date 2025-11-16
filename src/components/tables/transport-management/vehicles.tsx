import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	formatDate,
	registrationNumberCell,
	statusBadgeCell,
	vehicleStatusColors,
} from "@/components/utils";
import { TransportManagementVehiclesResponse } from "@/lib/pb.types";

type VehicleResponse = TransportManagementVehiclesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<VehicleResponse>[] = [
	{
		label: "Edit Vehicle",
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
		label: "Delete Vehicle",
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

export const columns: ColumnDef<VehicleResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "registrationNumber",
		header: "Registration Number",
		cell: ({ row }) =>
			registrationNumberCell(row.getValue("registrationNumber") as string),
	},
	{
		accessorKey: "model",
		header: "Model",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) =>
			statusBadgeCell(row.getValue("status") as string, vehicleStatusColors),
	},
	{
		accessorKey: "capacityWeight",
		header: "Capacity Weight (kg)",
	},
	{
		accessorKey: "capacityVolume",
		header: "Capacity Volume (m³)",
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
