import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	formatCurrency,
	formatDate,
	quoteStatusColors,
	statusBadgeCell,
	truncateText,
} from "@/components/utils";
import { BillingManagementQuotesResponse } from "@/lib/pb.types";

type QuoteResponse = BillingManagementQuotesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<QuoteResponse>[] = [
	{
		label: "Edit Quote",
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
		label: "Delete Quote",
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

export const columns: ColumnDef<QuoteResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "quoteNumber",
		header: "Quote #",
	},
	{
		accessorKey: "client",
		header: "Client ID",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) =>
			statusBadgeCell(row.getValue("status") as string, quoteStatusColors),
	},
	{
		accessorKey: "quotePrice",
		header: "Price",
		cell: ({ row }) => formatCurrency(row.getValue("quotePrice") as number),
	},
	{
		accessorKey: "serviceLevel",
		header: "Service Level",
	},
	{
		accessorKey: "originDetails",
		header: "Origin",
		cell: ({ row }) =>
			truncateText(row.getValue("originDetails") as string, 40),
	},
	{
		accessorKey: "destinationDetails",
		header: "Destination",
		cell: ({ row }) =>
			truncateText(row.getValue("destinationDetails") as string, 40),
	},
	{
		accessorKey: "weight",
		header: "Weight (kg)",
	},
	{
		accessorKey: "length",
		header: "Length (cm)",
	},
	{
		accessorKey: "width",
		header: "Width (cm)",
	},
	{
		accessorKey: "height",
		header: "Height (cm)",
	},
	{
		accessorKey: "expiredAt",
		header: "Expires At",
		cell: ({ row }) => {
			const date = row.getValue("expiredAt") as string | undefined;
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
];
