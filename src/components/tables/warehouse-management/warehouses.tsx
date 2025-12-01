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
import { booleanBadgeCell, emailCell, formatDate } from "@/components/utils";
import { WarehouseManagementWarehousesResponse } from "@/lib/pb.types";

type WarehouseResponse = WarehouseManagementWarehousesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<WarehouseResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Warehouse ID copied to clipboard");
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
		label: "Edit Warehouse",
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
		label: "Delete Warehouse",
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

export const columns: ColumnDef<WarehouseResponse>[] = [
	{
		accessorKey: "name",
		header: "Warehouse",
		cell: ({ row }) => {
			const city = row.original.city;
			const country = row.original.country;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>{row.getValue("name") as string}</ItemTitle>
						{(city || country) && (
							<ItemDescription>
								{[city, country].filter(Boolean).join(", ")}
							</ItemDescription>
						)}
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "address",
		header: "Location Details",
		cell: ({ row }) => {
			const address = row.original.address;
			const state = row.original.state;
			const postalCode = row.original.postalCode;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemDescription>
							{address}
							{state && ` | ${state}`}
							{postalCode && ` | ${postalCode}`}
						</ItemDescription>
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "contactPerson",
		header: "Contact",
		cell: ({ row }) => {
			const person = row.original.contactPerson;
			const email = row.original.contactEmail;
			const phone = row.original.contactPhone;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						{person && <ItemTitle>{person}</ItemTitle>}
						<ItemDescription>
							{email && emailCell(email)}
							{phone && ` | ${phone}`}
						</ItemDescription>
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "timezone",
		header: "Timezone",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>{row.getValue("timezone") as string}</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "isActive",
		header: "Status",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>
						{booleanBadgeCell(row.getValue("isActive") as boolean)}
					</ItemTitle>
				</ItemContent>
			</Item>
		),
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
