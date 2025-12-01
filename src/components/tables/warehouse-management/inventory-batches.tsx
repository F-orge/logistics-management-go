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
import { formatDate } from "@/components/utils";
import {
	WarehouseManagementInventoryBatchesResponse,
	WarehouseManagementProductsResponse,
} from "@/lib/pb.types";

type InventoryBatchResponse = WarehouseManagementInventoryBatchesResponse<{
	product: WarehouseManagementProductsResponse;
}>;

export const options: RecordListOptions = {
	expand: "product",
};

export const actions: ContextMenuItem<InventoryBatchResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Inventory Batch ID copied to clipboard");
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
		label: "Edit Inventory Batch",
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
		label: "Delete Inventory Batch",
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

export const columns: ColumnDef<InventoryBatchResponse>[] = [
	{
		accessorKey: "batchNumber",
		header: "Batch Number",
		cell: ({ row }) => {
			const product = row.original.expand?.product;
			const expDate = row.original.expirationDate;
			const isExpired = expDate && new Date(expDate) < new Date();
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>{row.getValue("batchNumber") as string}</ItemTitle>
						<ItemDescription>
							{product?.name ?? "-"}
							{expDate && (
								<span className={isExpired ? "text-red-600 font-semibold" : ""}>
									{" "}
									| Expires: {new Date(expDate).toLocaleDateString()}
								</span>
							)}
						</ItemDescription>
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
