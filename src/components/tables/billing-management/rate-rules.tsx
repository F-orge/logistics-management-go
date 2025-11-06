import { ColumnDef } from "@tanstack/react-table";
import { BillingManagementRateRulesResponse } from "@/lib/pb.types";

type RateRuleResponse = BillingManagementRateRulesResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "rateCard",
		header: "Rate Card ID",
	},
	{
		accessorKey: "value",
		header: "Value",
	},
	{
		accessorKey: "condition",
		header: "Condition",
	},
	{
		accessorKey: "minValue",
		header: "Min Value",
	},
	{
		accessorKey: "maxValue",
		header: "Max Value",
	},
	{
		accessorKey: "pricingModel",
		header: "Pricing Model",
		cell: ({ row }) => {
			const model = row.getValue("pricingModel") as string;
			return model.replace(/-/g, " ");
		},
	},
	{
		accessorKey: "price",
		header: "Price",
		cell: ({ row }) => {
			const price = row.getValue("price") as number;
			const model = row.original.pricingModel as string;
			return (
				<span>
					{new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(price)}
					{model === "percentage" ? "%" : ""}
				</span>
			);
		},
	},
	{
		accessorKey: "priority",
		header: "Priority",
	},
	{
		accessorKey: "isActive",
		header: "Active",
		cell: ({ row }) => {
			const isActive = row.getValue("isActive") as boolean | undefined;
			return isActive ? "✓" : "-";
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
] satisfies ColumnDef<RateRuleResponse>[];
