import { ColumnDef } from "@tanstack/react-table";
import { BillingManagementAccountTransactionsResponse } from "@/lib/pb.types";

type AccountTransactionResponse = BillingManagementAccountTransactionsResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "clientAccount",
		header: "Client Account ID",
	},
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ row }) => {
			const type = row.getValue("type") as string;
			const colors: Record<string, string> = {
				credit: "bg-green-100 text-green-800",
				debit: "bg-red-100 text-red-800",
				"top-up": "bg-blue-100 text-blue-800",
				refund: "bg-purple-100 text-purple-800",
				adjustment: "bg-yellow-100 text-yellow-800",
				fee: "bg-orange-100 text-orange-800",
			};
			return (
				<span className={`px-2 py-1 rounded text-sm ${colors[type] || ""}`}>
					{type.replace(/-/g, " ")}
				</span>
			);
		},
	},
	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({ row }) => {
			const amount = row.getValue("amount") as number;
			const type = row.original.type as string;
			const sign = type === "debit" || type === "fee" ? "-" : "+";
			return (
				<span
					className={
						type === "debit" || type === "fee"
							? "text-red-600"
							: "text-green-600"
					}
				>
					{sign}
					{new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(amount)}
				</span>
			);
		},
	},
	{
		accessorKey: "runningBalance",
		header: "Running Balance",
		cell: ({ row }) => {
			const balance = row.getValue("runningBalance") as number | undefined;
			return balance
				? new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(balance)
				: "-";
		},
	},
	{
		accessorKey: "referenceNumber",
		header: "Reference #",
	},
	{
		accessorKey: "transactionDate",
		header: "Transaction Date",
		cell: ({ row }) => {
			const date = row.getValue("transactionDate") as string | undefined;
			return date ? new Date(date).toLocaleDateString() : "-";
		},
	},
	{
		accessorKey: "processedBy",
		header: "Processed By",
	},
	{
		accessorKey: "created",
		header: "Created",
		cell: ({ row }) => {
			const date = row.getValue("created") as string;
			return new Date(date).toLocaleString();
		},
	},
] satisfies ColumnDef<AccountTransactionResponse>[];
