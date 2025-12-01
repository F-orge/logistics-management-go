import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash, View } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/components/ui/item";
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
		label: "View Record",
		icon: <View />,
		onSelect: (row, navigate) =>
			navigate({
				search: (prev) => ({ ...prev, action: "view", id: row.original.id }),
			}),
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
		accessorKey: "name",
		header: "Location",
		cell: ({ row }) => {
			const type = row.original.type;
			const barcode = row.original.barcode;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>{row.getValue("name") as string}</ItemTitle>
						<ItemDescription>
							{type && `${formatLocationType(type)}`}
							{barcode && ` | ${barcode}`}
						</ItemDescription>
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "level",
		header: "Level",
		cell: ({ row }) => {
			const level = row.getValue("level") as number | undefined;
			const maxWeight = row.original.maxWeight;
			const maxVolume = row.original.maxVolume;
			const maxPallets = row.original.maxPallets;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>{level ?? "-"}</ItemTitle>
						<ItemDescription>
							Weight: {maxWeight ?? "-"} kg | Volume: {maxVolume ?? "-"} m³ |
							Pallets: {maxPallets ?? "-"}
						</ItemDescription>
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "isPickable",
		header: "Pickable",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>
						{booleanBadgeCell(
							row.getValue("isPickable") as boolean | undefined,
						)}
					</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "isReceivable",
		header: "Receivable",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>
						{booleanBadgeCell(
							row.getValue("isReceivable") as boolean | undefined,
						)}
					</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "temperatureControlled",
		header: "Conditions",
		cell: ({ row }) => {
			const controlled = row.getValue("temperatureControlled") as
				| boolean
				| undefined;
			const hazmat = row.original.hazmatApproved;
			const isActive = row.original.isActive;
			const badges = [];
			if (controlled)
				badges.push(
					<span
						key="temp"
						className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
					>
						Controlled
					</span>,
				);
			if (hazmat)
				badges.push(
					<span
						key="hazmat"
						className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm"
					>
						Hazmat
					</span>,
				);
			if (isActive)
				badges.push(
					<span
						key="active"
						className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm"
					>
						Active
					</span>,
				);
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-1 flex flex-wrap">
						{badges.length > 0 ? badges : "-"}
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "created",
		header: "Created",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>{formatDate(row.getValue("created") as string)}</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
];
