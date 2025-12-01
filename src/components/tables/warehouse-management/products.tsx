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
	formatCurrency,
	formatDate,
	statusBadgeCell,
} from "@/components/utils";
import { WarehouseManagementProductsResponse } from "@/lib/pb.types";

type ProductResponse = WarehouseManagementProductsResponse;

const productStatusColors: Record<string, string> = {
	active: "bg-green-100 text-green-800",
	inactive: "bg-gray-100 text-gray-800",
	discontinued: "bg-red-100 text-red-800",
};

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<ProductResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Product ID copied to clipboard");
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
		label: "Edit Product",
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
		label: "Delete Product",
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

export const columns: ColumnDef<ProductResponse>[] = [
	{
		accessorKey: "name",
		header: "Product",
		cell: ({ row }) => {
			const sku = row.original.sku;
			const barcode = row.original.barcode;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>{row.getValue("name") as string}</ItemTitle>
						<ItemDescription>
							{sku && `SKU: ${sku}`}
							{barcode && ` | ${barcode}`}
						</ItemDescription>
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
							productStatusColors,
						)}
					</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "costPrice",
		header: "Pricing",
		cell: ({ row }) => {
			const cost = row.original.costPrice;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>Cost: {cost ? formatCurrency(cost) : "-"}</ItemTitle>
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "weight",
		header: "Dimensions",
		cell: ({ row }) => {
			const weight = row.getValue("weight") as number | undefined;
			const length = row.original.length;
			const width = row.original.width;
			const height = row.original.height;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemDescription>
							W: {weight ?? "-"} kg | L: {length ?? "-"} | W: {width ?? "-"} |
							H: {height ?? "-"}
						</ItemDescription>
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: ({ row }) => {
			const desc = row.getValue("description") as string | undefined;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemDescription>{desc ?? "-"}</ItemDescription>
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
