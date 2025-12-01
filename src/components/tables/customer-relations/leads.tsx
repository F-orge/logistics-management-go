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
	emailCell,
	formatDate,
	formatHyphens,
	leadStatusColors,
	statusBadgeCell,
} from "@/components/utils";
import {
	CustomerRelationsCampaignsResponse,
	CustomerRelationsLeadsResponse,
	UsersRecord,
} from "@/lib/pb.types";

type LeadResponse = CustomerRelationsLeadsResponse<{
	owner?: UsersRecord;
	campaign?: CustomerRelationsCampaignsResponse;
}>;

export const options: RecordListOptions = { expand: "owner,campaign" };

export const actions: ContextMenuItem<LeadResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Lead ID copied to clipboard");
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
		label: "Edit Lead",
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
		label: "Delete Lead",
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

export const columns: ColumnDef<LeadResponse>[] = [
	{
		accessorKey: "name",
		header: "Lead Name",
		cell: ({ row }) => {
			const email = row.getValue("email") as string | undefined;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>{row.getValue("name") || "-"}</ItemTitle>
						{email && <ItemDescription>{email}</ItemDescription>}
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>
						{statusBadgeCell(
							row.getValue("status") as string | undefined,
							leadStatusColors,
						)}
					</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "source",
		header: "Source",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>
						{formatHyphens(row.getValue("source") as string | undefined)}
					</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "score",
		header: "Score",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>{row.getValue("score")}</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "campaign",
		header: "Campaign",
		cell: ({ row }) => {
			const campaign = row.original.expand?.campaign as
				| CustomerRelationsCampaignsResponse
				| undefined;
			if (!campaign) return "-";
			return (
				<a
					href={`/dashboard/customer-relations/campaigns?action=view&id=${campaign.id}`}
					className="hover:underline"
				>
					<Item size="sm" className="p-0">
						<ItemContent className="gap-0.5">
							<ItemTitle>{campaign.name}</ItemTitle>
						</ItemContent>
					</Item>
				</a>
			);
		},
	},
	{
		accessorKey: "convertedAt",
		header: "Converted At",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>
						{formatDate(row.getValue("convertedAt") as string | undefined)}
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
