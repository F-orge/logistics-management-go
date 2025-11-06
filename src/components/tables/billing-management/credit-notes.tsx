import { ColumnDef } from "@tanstack/react-table";
import { BillingManagementCreditNotesResponse } from "@/lib/pb.types";

type CreditNoteResponse = BillingManagementCreditNotesResponse;

export default [
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
		cell: ({ row }) => {
			const amount = row.getValue("amount") as number | undefined;
			return amount
				? new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(amount)
				: "-";
		},
	},
	{
		accessorKey: "currency",
		header: "Currency",
	},
	{
		accessorKey: "issueDate",
		header: "Issue Date",
		cell: ({ row }) => {
			const date = row.getValue("issueDate") as string;
			return new Date(date).toLocaleDateString();
		},
	},
	{
		accessorKey: "appliedAt",
		header: "Applied At",
		cell: ({ row }) => {
			const date = row.getValue("appliedAt") as string | undefined;
			return date ? new Date(date).toLocaleDateString() : "-";
		},
	},
	{
		accessorKey: "reason",
		header: "Reason",
		cell: ({ row }) => {
			const reason = row.getValue("reason") as string;
			return reason.substring(0, 50) + (reason.length > 50 ? "..." : "");
		},
	},
	{
		accessorKey: "notes",
		header: "Notes",
		cell: ({ row }) => {
			const notes = row.getValue("notes") as string | undefined;
			return notes ? notes.substring(0, 50) + "..." : "-";
		},
	},
	{
		accessorKey: "created",
		header: "Created",
		cell: ({ row }) => {
			const date = row.getValue("created") as string;
			return new Date(date).toLocaleDateString();
		},
	},
] satisfies ColumnDef<CreditNoteResponse>[];
