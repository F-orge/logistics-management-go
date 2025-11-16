import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	coordinatesCell,
	formatDate,
	shipmentLegStatusColors,
	statusBadgeCell,
} from "@/components/utils";
import { TransportManagementShipmentLegsResponse } from "@/lib/pb.types";

type ShipmentLegResponse = TransportManagementShipmentLegsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<ShipmentLegResponse>[] = [
	{
		label: "Edit Shipment Leg",
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
		label: "Delete Shipment Leg",
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

export const columns: ColumnDef<ShipmentLegResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "shipment",
		header: "Shipment ID",
	},
	{
		accessorKey: "carrier",
		header: "Carrier ID",
	},
	{
		accessorKey: "legSequence",
		header: "Sequence",
	},
	{
		accessorKey: "startLocation",
		header: "Start Location",
		cell: ({ row }) => coordinatesCell(row.getValue("startLocation")),
	},
	{
		accessorKey: "endLocation",
		header: "End Location",
		cell: ({ row }) => coordinatesCell(row.getValue("endLocation")),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) =>
			statusBadgeCell(
				row.getValue("status") as string,
				shipmentLegStatusColors,
			),
	},
	{
		accessorKey: "created",
		header: "Created",
		cell: ({ row }) => formatDate(row.getValue("created") as string),
	},
];
