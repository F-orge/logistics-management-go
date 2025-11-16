import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	billingInvoiceStatusColors,
	formatCurrency,
	formatDate,
	statusBadgeCell,
} from "@/components/utils";
import { BillingManagementInvoicesResponse } from "@/lib/pb.types";

type InvoiceResponse = BillingManagementInvoicesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<InvoiceResponse>[] = [
	{
		label: "Edit Invoice",
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
		label: "Delete Invoice",
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

export const columns: ColumnDef<InvoiceResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "invoiceNumber",
		header: "Invoice #",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) =>
			statusBadgeCell(
				row.getValue("status") as string,
				billingInvoiceStatusColors,
			),
	},
	{
		accessorKey: "subtotal",
		header: "Subtotal",
		cell: ({ row }) => formatCurrency(row.getValue("subtotal") as number),
	},
	{
		accessorKey: "discountAmount",
		header: "Discount",
		cell: ({ row }) => formatCurrency(row.getValue("discountAmount") as number),
	},
	{
		accessorKey: "totalAmount",
		header: "Total",
		cell: ({ row }) => (
			<span className="font-semibold">
				{formatCurrency(row.getValue("totalAmount") as number)}
			</span>
		),
	},
	{
		accessorKey: "amountPaid",
		header: "Amount Paid",
		cell: ({ row }) => formatCurrency(row.getValue("amountPaid") as number),
	},
	{
		accessorKey: "issueDate",
		header: "Issue Date",
		cell: ({ row }) => formatDate(row.getValue("issueDate") as string),
	},
	{
		accessorKey: "dueDate",
		header: "Due Date",
		cell: ({ row }) => {
			const date = row.getValue("dueDate") as string | undefined;
			if (!date) return "-";
			const dueDate = new Date(date);
			const today = new Date();
			const isOverdue = dueDate < today;
			return (
				<span className={isOverdue ? "text-red-600 font-semibold" : ""}>
					{formatDate(date)}
				</span>
			);
		},
	},
	{
		accessorKey: "sentAt",
		header: "Sent At",
		cell: ({ row }) => formatDate(row.getValue("sentAt") as string),
	},
	{
		accessorKey: "paidAt",
		header: "Paid At",
		cell: ({ row }) => formatDate(row.getValue("paidAt") as string),
	},
];
