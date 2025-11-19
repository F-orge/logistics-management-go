import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	formatDate,
	interactionTypeCell,
	truncateText,
} from "@/components/utils";
import { CustomerRelationsInteractionsResponse } from "@/lib/pb.types";

type InteractionResponse = CustomerRelationsInteractionsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<InteractionResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Interaction ID copied to clipboard");
		},
	},
	{
		label: "Share Via QR Code",
		icon: <QrCode />,
		onSelect: (row, navigate) =>
			navigate({
				search: (prev) => ({ ...prev, action: "share", id: row.original.id }),
			}),
		divider: true,
	},
	{
		label: "Edit Interaction",
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
		label: "Delete Interaction",
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

export const columns: ColumnDef<InteractionResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ row }) =>
			interactionTypeCell(row.getValue("type") as string | undefined),
	},
	{
		accessorKey: "interactionDate",
		header: "Date",
		cell: ({ row }) => formatDate(row.getValue("interactionDate") as string),
	},
	{
		accessorKey: "outcome",
		header: "Outcome",
	},
	{
		accessorKey: "notes",
		header: "Notes",
		cell: ({ row }) =>
			truncateText(row.getValue("notes") as string | undefined),
	},
	{
		accessorKey: "contact",
		header: "Contact ID",
	},
	{
		accessorKey: "user",
		header: "User ID",
	},
	{
		accessorKey: "case",
		header: "Case ID",
	},
];
