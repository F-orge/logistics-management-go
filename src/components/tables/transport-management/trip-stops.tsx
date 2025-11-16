import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	formatDateTime,
	statusBadgeCell,
	tripStopStatusColors,
} from "@/components/utils";
import { TransportManagementTripStopsResponse } from "@/lib/pb.types";

type TripStopResponse = TransportManagementTripStopsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<TripStopResponse>[] = [
	{
		label: "Edit Trip Stop",
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
		label: "Delete Trip Stop",
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

export const columns: ColumnDef<TripStopResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "trip",
		header: "Trip ID",
	},
	{
		accessorKey: "shipment",
		header: "Shipment ID",
	},
	{
		accessorKey: "sequence",
		header: "Sequence",
	},
	{
		accessorKey: "address",
		header: "Address",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) =>
			statusBadgeCell(row.getValue("status") as string, tripStopStatusColors),
	},
	{
		accessorKey: "estimatedArrivalTime",
		header: "Est. Arrival",
		cell: ({ row }) => {
			const date = row.getValue("estimatedArrivalTime") as string | undefined;
			return date ? formatDateTime(date) : "-";
		},
	},
	{
		accessorKey: "actualArrivalTime",
		header: "Actual Arrival",
		cell: ({ row }) => {
			const date = row.getValue("actualArrivalTime") as string | undefined;
			return date ? formatDateTime(date) : "-";
		},
	},
	{
		accessorKey: "estimatedDepartureTime",
		header: "Est. Departure",
		cell: ({ row }) => {
			const date = row.getValue("estimatedDepartureTime") as string | undefined;
			return date ? formatDateTime(date) : "-";
		},
	},
	{
		accessorKey: "actualDepartureTime",
		header: "Actual Departure",
		cell: ({ row }) => {
			const date = row.getValue("actualDepartureTime") as string | undefined;
			return date ? formatDateTime(date) : "-";
		},
	},
];
