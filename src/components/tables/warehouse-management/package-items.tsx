import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatDate } from "@/components/utils";
import { WarehouseManagementPackageItemsResponse } from "@/lib/pb.types";

type PackageItemResponse = WarehouseManagementPackageItemsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<PackageItemResponse>[] = [
	{
		label: "Edit Package Item",
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
		label: "Delete Package Item",
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

export const columns: ColumnDef<PackageItemResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "package",
		header: "Package ID",
	},
	{
		accessorKey: "product",
		header: "Product ID",
	},
	{
		accessorKey: "quantity",
		header: "Quantity",
	},
	{
		accessorKey: "lotNumber",
		header: "Lot Number",
	},
	{
		accessorKey: "batch",
		header: "Batch ID",
	},
	{
		accessorKey: "expiryDate",
		header: "Expiry Date",
		cell: ({ row }) => {
			const date = row.getValue("expiryDate") as string | undefined;
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
