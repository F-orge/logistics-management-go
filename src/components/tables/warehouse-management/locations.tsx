import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	booleanBadgeCell,
	formatDate,
	formatLocationType,
} from "@/components/utils";
import { WarehouseManagementLocationsResponse } from "@/lib/pb.types";

type LocationResponse = WarehouseManagementLocationsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<LocationResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Location ID copied to clipboard");
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
		label: "Edit Location",
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
		label: "Delete Location",
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

export const columns: ColumnDef<LocationResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "Location Name",
	},
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ row }) => {
			const type = row.getValue("type") as string | undefined;
			return type ? formatLocationType(type) : "-";
		},
	},
	{
		accessorKey: "barcode",
		header: "Barcode",
	},
	{
		accessorKey: "level",
		header: "Level",
	},
	{
		accessorKey: "maxWeight",
		header: "Max Weight",
	},
	{
		accessorKey: "maxVolume",
		header: "Max Volume",
	},
	{
		accessorKey: "maxPallets",
		header: "Max Pallets",
	},
	{
		accessorKey: "isPickable",
		header: "Pickable",
		cell: ({ row }) =>
			booleanBadgeCell(row.getValue("isPickable") as boolean | undefined),
	},
	{
		accessorKey: "isReceivable",
		header: "Receivable",
		cell: ({ row }) =>
			booleanBadgeCell(row.getValue("isReceivable") as boolean | undefined),
	},
	{
		accessorKey: "temperatureControlled",
		header: "Temperature Controlled",
		cell: ({ row }) => {
			const controlled = row.getValue("temperatureControlled") as
				| boolean
				| undefined;
			return controlled ? (
				<span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
					Controlled
				</span>
			) : (
				"-"
			);
		},
	},
	{
		accessorKey: "hazmatApproved",
		header: "Hazmat Approved",
		cell: ({ row }) => {
			const approved = row.getValue("hazmatApproved") as boolean | undefined;
			return approved ? (
				<span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm">
					Approved
				</span>
			) : (
				"-"
			);
		},
	},
	{
		accessorKey: "isActive",
		header: "Active",
		cell: ({ row }) => {
			const isActive = row.getValue("isActive") as boolean | undefined;
			return isActive ? (
				<span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
					Active
				</span>
			) : (
				<span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
					Inactive
				</span>
			);
		},
	},
	{
		accessorKey: "created",
		header: "Created",
		cell: ({ row }) => formatDate(row.getValue("created") as string),
	},
];
