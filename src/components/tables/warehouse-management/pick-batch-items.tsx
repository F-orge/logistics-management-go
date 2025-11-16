import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatDate } from "@/components/utils";
import { WarehouseManagementPickBatchItemsResponse } from "@/lib/pb.types";

type PickBatchItemResponse = WarehouseManagementPickBatchItemsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<PickBatchItemResponse>[] = [
	{
		label: "Edit Pick Batch Item",
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
		label: "Delete Pick Batch Item",
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

export const columns: ColumnDef<PickBatchItemResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "pickBatch",
		header: "Pick Batch ID",
	},
	{
		accessorKey: "salesOrder",
		header: "Sales Order ID",
	},
	{
		accessorKey: "orderPriority",
		header: "Order Priority",
	},
	{
		accessorKey: "estimatedPickTime",
		header: "Estimated Pick Time",
		cell: ({ row }) => {
			const date = row.getValue("estimatedPickTime") as string | undefined;
			return date ? formatDate(date) : "-";
		},
	},
	{
		accessorKey: "actualPickTime",
		header: "Actual Pick Time (min)",
		cell: ({ row }) => {
			const time = row.getValue("actualPickTime") as number | undefined;
			return time ? `${time} min` : "-";
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
