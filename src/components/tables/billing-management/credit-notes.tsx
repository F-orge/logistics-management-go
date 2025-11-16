import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatCurrency, formatDate, truncateText } from "@/components/utils";
import { BillingManagementCreditNotesResponse } from "@/lib/pb.types";

type CreditNoteResponse = BillingManagementCreditNotesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<CreditNoteResponse>[] = [
	{
		label: "Edit Credit Note",
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
		label: "Delete Credit Note",
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

export const columns: ColumnDef<CreditNoteResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "creditNoteNumber",
		header: "Credit Note #",
	},
	{
		accessorKey: "dispute",
		header: "Dispute ID",
	},
	{
		accessorKey: "invoice",
		header: "Invoice ID",
	},
	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({ row }) => formatCurrency(row.getValue("amount") as number),
	},
	{
		accessorKey: "currency",
		header: "Currency",
	},
	{
		accessorKey: "issueDate",
		header: "Issue Date",
		cell: ({ row }) => formatDate(row.getValue("issueDate") as string),
	},
	{
		accessorKey: "appliedAt",
		header: "Applied At",
		cell: ({ row }) => formatDate(row.getValue("appliedAt") as string),
	},
	{
		accessorKey: "reason",
		header: "Reason",
		cell: ({ row }) => truncateText(row.getValue("reason") as string, 50),
	},
	{
		accessorKey: "notes",
		header: "Notes",
		cell: ({ row }) => truncateText(row.getValue("notes") as string, 50),
	},
	{
		accessorKey: "created",
		header: "Created",
		cell: ({ row }) => formatDate(row.getValue("created") as string),
	},
];
