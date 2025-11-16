import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatDate } from "@/components/utils";
import { WarehouseManagementSalesOrderItemsResponse } from "@/lib/pb.types";

type SalesOrderItemResponse = WarehouseManagementSalesOrderItemsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<SalesOrderItemResponse>[] = [
	{
		label: "Edit Sales Order Item",
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
		label: "Delete Sales Order Item",
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

export const columns: ColumnDef<SalesOrderItemResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "salesOrder",
		header: "Sales Order ID",
	},
	{
		accessorKey: "product",
		header: "Product ID",
	},
	{
		accessorKey: "quantityOrdered",
		header: "Quantity Ordered",
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
