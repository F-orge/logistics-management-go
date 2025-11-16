import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	formatCurrency,
	formatDate,
	invoiceStatusColors,
	statusBadgeCell,
} from "@/components/utils";
import { TransportManagementPartnerInvoiceResponse } from "@/lib/pb.types";

type PartnerInvoiceResponse = TransportManagementPartnerInvoiceResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<PartnerInvoiceResponse>[] = [
	{
		label: "Edit Partner Invoice",
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
		label: "Delete Partner Invoice",
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

export const columns: ColumnDef<PartnerInvoiceResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "invoiceNumber",
		header: "Invoice Number",
	},
	{
		accessorKey: "carrier",
		header: "Carrier ID",
	},
	{
		accessorKey: "invoiceDate",
		header: "Invoice Date",
		cell: ({ row }) => formatDate(row.getValue("invoiceDate") as string),
	},
	{
		accessorKey: "totalAmount",
		header: "Total Amount",
		cell: ({ row }) => formatCurrency(row.getValue("totalAmount") as number),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) =>
			statusBadgeCell(
				row.getValue("status") as string | undefined,
				invoiceStatusColors,
			),
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
