import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { booleanBadgeCell, formatDate, truncateText } from "@/components/utils";
import { BillingManagementRateCardsResponse } from "@/lib/pb.types";

type RateCardResponse = BillingManagementRateCardsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<RateCardResponse>[] = [
	{
		label: "Edit Rate Card",
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
		label: "Delete Rate Card",
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

export const columns: ColumnDef<RateCardResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "Rate Card Name",
	},
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ row }) => {
			const type = row.getValue("type") as string;
			const icons: Record<string, string> = {
				shipping: "📦",
				storage: "🏢",
				fulfillment: "📋",
				handling: "✋",
				insurance: "🛡️",
				customs: "🚨",
				packaging: "📦",
				returns: "🔄",
			};
			return (
				<span>
					{icons[type] || ""} {type}
				</span>
			);
		},
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: ({ row }) => truncateText(row.getValue("description") as string, 50),
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
				<span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
					Inactive
				</span>
			);
		},
	},
	{
		accessorKey: "validFrom",
		header: "Valid From",
		cell: ({ row }) => formatDate(row.getValue("validFrom") as string),
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
					{formatDate(date)}
				</span>
			);
		},
	},
	{
		accessorKey: "createdBy",
		header: "Created By",
	},
	{
		accessorKey: "created",
		header: "Created",
		cell: ({ row }) => formatDate(row.getValue("created") as string),
	},
];
