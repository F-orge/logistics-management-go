import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatDate } from "@/components/utils";
import { WarehouseManagementInventoryBatchesResponse } from "@/lib/pb.types";

type InventoryBatchResponse = WarehouseManagementInventoryBatchesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<InventoryBatchResponse>[] = [
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
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "product",
		header: "Product ID",
	},
	{
		accessorKey: "batchNumber",
		header: "Batch Number",
	},
	{
		accessorKey: "expirationDate",
		header: "Expiration Date",
		cell: ({ row }) => {
			const date = row.getValue("expirationDate") as string | undefined;
			if (!date) return "-";
			const expDate = new Date(date);
			const today = new Date();
			const isExpired = expDate < today;
			return (
				<span className={isExpired ? "text-red-600 font-semibold" : ""}>
					{expDate.toLocaleDateString()}
				</span>
			);
		},
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
