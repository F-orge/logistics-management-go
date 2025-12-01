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
	formatDate,
	inventoryStockStatusColors,
	statusBadgeCell,
} from "@/components/utils";
import {
	WarehouseManagementInventoryStockResponse,
	WarehouseManagementLocationsResponse,
	WarehouseManagementProductsResponse,
} from "@/lib/pb.types";

type InventoryStockResponse = WarehouseManagementInventoryStockResponse<{
	product: WarehouseManagementProductsResponse;
	location: WarehouseManagementLocationsResponse;
}>;

export const options: RecordListOptions = {
	expand: "product,location",
};

export const actions: ContextMenuItem<InventoryStockResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Inventory Stock ID copied to clipboard");
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
		label: "Edit Inventory Stock",
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
		label: "Delete Inventory Stock",
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

export const columns: ColumnDef<InventoryStockResponse>[] = [
	{
		accessorKey: "product",
		header: "Product",
		cell: ({ row }) => {
			const product = row.original.expand?.product;
			const qty = row.original.quantity ?? 0;
			const reserved = row.original.reservedQuantity ?? 0;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>{product?.name ?? "-"}</ItemTitle>
						<ItemDescription>
							Qty: {qty} | Reserved: {reserved}
						</ItemDescription>
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "location",
		header: "Location",
		cell: ({ row }) => {
			const location = row.original.expand?.location;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>{location?.name ?? "-"}</ItemTitle>
						{location?.barcode && (
							<ItemDescription>{location.barcode}</ItemDescription>
						)}
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>
						{statusBadgeCell(
							row.getValue("status") as string,
							inventoryStockStatusColors,
						)}
					</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "lastMovementAt",
		header: "Last Movement",
		cell: ({ row }) => {
			const date = row.getValue("lastMovementAt") as string | undefined;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>{date ? formatDate(date) : "-"}</ItemTitle>
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "lastCountedAt",
		header: "Last Counted",
		cell: ({ row }) => {
			const date = row.getValue("lastCountedAt") as string | undefined;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>{date ? formatDate(date) : "-"}</ItemTitle>
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
