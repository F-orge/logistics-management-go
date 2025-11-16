import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatCurrency, formatDate, truncateText } from "@/components/utils";
import { BillingManagementInvoiceLineItemsResponse } from "@/lib/pb.types";

type InvoiceLineItemResponse = BillingManagementInvoiceLineItemsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<InvoiceLineItemResponse>[] = [
	{
		label: "Edit Line Item",
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
		label: "Delete Line Item",
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

export const columns: ColumnDef<InvoiceLineItemResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "invoice",
		header: "Invoice ID",
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: ({ row }) => truncateText(row.getValue("description") as string, 50),
	},
	{
		accessorKey: "quantity",
		header: "Quantity",
	},
	{
		accessorKey: "unitPrice",
		header: "Unit Price",
		cell: ({ row }) => formatCurrency(row.getValue("unitPrice") as number),
	},
	{
		accessorKey: "discountRate",
		header: "Discount %",
		cell: ({ row }) => {
			const rate = row.getValue("discountRate") as number | undefined;
			return rate ? `${rate}%` : "-";
		},
	},
	{
		accessorKey: "discountAmount",
		header: "Discount",
		cell: ({ row }) => formatCurrency(row.getValue("discountAmount") as number),
	},
	{
		accessorKey: "taxRate",
		header: "Tax %",
		cell: ({ row }) => {
			const rate = row.getValue("taxRate") as number | undefined;
			return rate ? `${rate}%` : "-";
		},
	},
	{
		accessorKey: "taxAmount",
		header: "Tax",
		cell: ({ row }) => formatCurrency(row.getValue("taxAmount") as number),
	},
	{
		accessorKey: "created",
		header: "Created",
		cell: ({ row }) => formatDate(row.getValue("created") as string),
	},
];
