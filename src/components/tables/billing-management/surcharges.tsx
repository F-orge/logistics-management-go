import { ColumnDef } from "@tanstack/react-table";
import { BillingManagementSurchargesResponse } from "@/lib/pb.types";

type SurchargeResponse = BillingManagementSurchargesResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "Surcharge Name",
	},
	{
		accessorKey: "type",
		header: "Type",
	},
	{
		accessorKey: "calculationMethod",
		header: "Calculation Method",
		cell: ({ row }) => {
			const method = row.getValue("calculationMethod") as string | undefined;
			return method ? method.replace(/-/g, " ") : "-";
		},
	},
	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({ row }) => {
			const amount = row.getValue("amount") as number | undefined;
			const method = row.original.calculationMethod as string | undefined;
			if (!amount) return "-";
			return (
				<span>
					{new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(amount)}
					{method === "percentage" ? "%" : ""}
				</span>
			);
		},
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: ({ row }) => {
			const desc = row.getValue("description") as string | undefined;
			return desc ? desc.substring(0, 50) + "..." : "-";
		},
	},
	{
		accessorKey: "isActive",
		header: "Active",
		cell: ({ row }) => {
			const isActive = row.getValue("isActive") as boolean | undefined;
			return isActive ? (
				<span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
					Active
				</span>
			) : (
				"-"
			);
		},
	},
	{
		accessorKey: "validFrom",
		header: "Valid From",
		cell: ({ row }) => {
			const date = row.getValue("validFrom") as string | undefined;
			return date ? new Date(date).toLocaleDateString() : "-";
		},
	},
	{
		accessorKey: "validTo",
		header: "Valid To",
		cell: ({ row }) => {
			const date = row.getValue("validTo") as string | undefined;
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
		cell: ({ row }) => {
			const date = row.getValue("created") as string;
			return new Date(date).toLocaleDateString();
		},
	},
] satisfies ColumnDef<SurchargeResponse>[];
