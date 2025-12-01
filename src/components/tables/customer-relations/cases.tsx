import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash, View } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/components/ui/item";
import {
	casePriorityColors,
	caseStatusColors,
	formatDate,
	formatHyphens,
	statusBadgeCell,
	truncateText,
} from "@/components/utils";
import { CustomerRelationsCasesResponse, UsersRecord } from "@/lib/pb.types";

type CaseResponse = CustomerRelationsCasesResponse<{
	owner?: UsersRecord;
}>;

export const options: RecordListOptions = { expand: "owner" };

export const actions: ContextMenuItem<CaseResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Case ID copied to clipboard");
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
		label: "View Record",
		icon: <View />,
		onSelect: (row, navigate) =>
			navigate({
				search: (prev) => ({ ...prev, action: "view", id: row.original.id }),
			}),
	},
	{
		label: "Edit Case",
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
		label: "Delete Case",
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

export const columns: ColumnDef<CaseResponse>[] = [
	{
		accessorKey: "caseNumber",
		header: "Case Number",
		cell: ({ row }) => {
			const owner = row.original.expand?.owner as UsersRecord | undefined;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>{row.getValue("caseNumber")}</ItemTitle>
						<ItemDescription>
							{owner ? owner.name || owner.email : "Unassigned"}
						</ItemDescription>
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>{formatHyphens(row.getValue("type") as string)}</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>
						{statusBadgeCell(
							row.getValue("status") as string,
							caseStatusColors,
						)}
					</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "priority",
		header: "Priority",
		cell: ({ row }) => {
			const priority = row.getValue("priority") as string;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>
							{statusBadgeCell(priority, casePriorityColors)}
						</ItemTitle>
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>
						{truncateText(row.getValue("description") as string | undefined)}
					</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "created",
		header: "Created",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>{formatDate(row.getValue("created") as string)}</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
];
