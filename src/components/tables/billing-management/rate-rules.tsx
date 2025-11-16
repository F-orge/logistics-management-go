import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	booleanBadgeCell,
	formatCurrency,
	formatDate,
} from "@/components/utils";
import { BillingManagementRateRulesResponse } from "@/lib/pb.types";

type RateRuleResponse = BillingManagementRateRulesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<RateRuleResponse>[] = [
	{
		label: "Edit Rate Rule",
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
		label: "Delete Rate Rule",
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

export const columns: ColumnDef<RateRuleResponse>[] = [
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
					{formatCurrency(price)}
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
		cell: ({ row }) => booleanBadgeCell(row.getValue("isActive") as boolean),
	},
	{
		accessorKey: "created",
		header: "Created",
		cell: ({ row }) => formatDate(row.getValue("created") as string),
	},
];
