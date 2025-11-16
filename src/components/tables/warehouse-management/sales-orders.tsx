import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	formatDate,
	salesOrderStatusColors,
	statusBadgeCell,
} from "@/components/utils";
import { WarehouseManagementSalesOrdersResponse } from "@/lib/pb.types";

type SalesOrderResponse = WarehouseManagementSalesOrdersResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<SalesOrderResponse>[] = [
	{
		label: "Edit Sales Order",
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
		label: "Delete Sales Order",
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

export const columns: ColumnDef<SalesOrderResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "orderNumber",
		header: "Order Number",
	},
	{
		accessorKey: "client",
		header: "Client ID",
	},
	{
		accessorKey: "opportunity",
		header: "Opportunity ID",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) =>
			statusBadgeCell(row.getValue("status") as string, salesOrderStatusColors),
	},
	{
		accessorKey: "shippingAddress",
		header: "Shipping Address",
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
