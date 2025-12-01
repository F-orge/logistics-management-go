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
import { coordinatesCell, formatDateTime } from "@/components/utils";
import {
	DeliveryManagementDriverLocationResponse,
	TransportManagementDriversResponse,
} from "@/lib/pb.types";

type DriverLocationResponse = DeliveryManagementDriverLocationResponse<{
	driver?: TransportManagementDriversResponse;
}>;

export const options: RecordListOptions = { expand: "driver" };

export const actions: ContextMenuItem<DriverLocationResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Driver Location ID copied to clipboard");
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
		label: "Edit Driver Location",
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
		label: "Delete Driver Location",
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

export const columns: ColumnDef<DriverLocationResponse>[] = [
	{
		accessorKey: "driver",
		header: "Driver",
		cell: ({ row }) => {
			const driver = row.original.expand?.driver as
				| TransportManagementDriversResponse
				| undefined;
			if (!driver) return "-";
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>
							{driver.licenseNumber || driver.id.slice(0, 8)}
						</ItemTitle>
						<ItemDescription>License: {driver.licenseNumber}</ItemDescription>
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "coordinates",
		header: "Current Location",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>
						{coordinatesCell(
							row.getValue("coordinates") as { lon: number; lat: number },
						)}
					</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "timestamp",
		header: "Updated",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>
						{formatDateTime(row.getValue("timestamp") as string)}
					</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
];
