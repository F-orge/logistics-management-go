import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatCurrency, formatDate } from "@/components/utils";
import { BillingManagementClientAccountsResponse } from "@/lib/pb.types";

type ClientAccountResponse = BillingManagementClientAccountsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<ClientAccountResponse>[] = [
	{
		label: "Edit Account",
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
		label: "Delete Account",
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

export const columns: ColumnDef<ClientAccountResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "client",
		header: "Client ID",
	},
	{
		accessorKey: "currency",
		header: "Currency",
	},
	{
		accessorKey: "creditLimit",
		header: "Credit Limit",
		cell: ({ row }) => formatCurrency(row.getValue("creditLimit") as number),
	},
	{
		accessorKey: "availableCredit",
		header: "Available Credit",
		cell: ({ row }) => {
			const credit = row.getValue("availableCredit") as number | undefined;
			if (!credit) return "-";
			return (
				<span
					className={
						credit < 0 ? "text-red-600 font-semibold" : "text-green-600"
					}
				>
					{new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(credit)}
				</span>
			);
		},
	},
	{
		accessorKey: "walletBalance",
		header: "Wallet Balance",
		cell: ({ row }) => formatCurrency(row.getValue("walletBalance") as number),
	},
	{
		accessorKey: "isCreditApproved",
		header: "Credit Approved",
		cell: ({ row }) => {
			const approved = row.getValue("isCreditApproved") as boolean | undefined;
			return approved ? (
				<span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
					Approved
				</span>
			) : (
				<span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
					Not Approved
				</span>
			);
		},
	},
	{
		accessorKey: "paymentTermsDays",
		header: "Payment Terms (days)",
	},
	{
		accessorKey: "lastPaymentDate",
		header: "Last Payment",
		cell: ({ row }) => formatDate(row.getValue("lastPaymentDate") as string),
	},
	{
		accessorKey: "created",
		header: "Created",
		cell: ({ row }) => formatDate(row.getValue("created") as string),
	},
];
