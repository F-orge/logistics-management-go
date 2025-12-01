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
	formatCurrency,
	formatDate,
	formatHyphens,
	opportunityStageColors,
	percentageCell,
	statusBadgeCell,
} from "@/components/utils";
import {
	CustomerRelationsCampaignsResponse,
	CustomerRelationsCompaniesResponse,
	CustomerRelationsContactsResponse,
	CustomerRelationsOpportunitiesResponse,
	UsersRecord,
} from "@/lib/pb.types";

type OpportunityResponse = CustomerRelationsOpportunitiesResponse<{
	owner?: UsersRecord;
	contact?: CustomerRelationsContactsResponse;
	company?: CustomerRelationsCompaniesResponse;
	campaign?: CustomerRelationsCampaignsResponse;
}>;

export const options: RecordListOptions = {
	expand: "owner,contact,company,campaign",
};

export const actions: ContextMenuItem<OpportunityResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Opportunity ID copied to clipboard");
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
		label: "Edit Opportunity",
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
		label: "Delete Opportunity",
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

export const columns: ColumnDef<OpportunityResponse>[] = [
	{
		accessorKey: "name",
		header: "Opportunity Name",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>{row.getValue("name")}</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "stage",
		header: "Stage",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>
						{statusBadgeCell(
							row.getValue("stage") as string | undefined,
							opportunityStageColors,
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
						{formatHyphens(row.getValue("source") as string)}
					</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "dealValue",
		header: "Deal Value",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>
						{formatCurrency(row.getValue("dealValue") as number | undefined)}
					</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "probability",
		header: "Probability %",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>
						{percentageCell(row.getValue("probability") as number | undefined)}
					</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "expectedCloseDate",
		header: "Expected Close Date",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>
						{formatDate(
							row.getValue("expectedCloseDate") as string | undefined,
						)}
					</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "company",
		header: "Company",
		cell: ({ row }) => {
			const company = row.original.expand?.company as
				| CustomerRelationsCompaniesResponse
				| undefined;
			if (!company) return "-";
			return (
				<a
					href={`/dashboard/customer-relations/companies?action=view&id=${company.id}`}
					className="hover:underline"
				>
					<Item size="sm" className="p-0">
						<ItemContent className="gap-0.5">
							<ItemTitle>{company.name}</ItemTitle>
						</ItemContent>
					</Item>
				</a>
			);
		},
	},
	{
		accessorKey: "contact",
		header: "Contact",
		cell: ({ row }) => {
			const contact = row.original.expand?.contact as
				| CustomerRelationsContactsResponse
				| undefined;
			if (!contact) return "-";
			return (
				<a
					href={`/dashboard/customer-relations/contacts?action=view&id=${contact.id}`}
					className="hover:underline"
				>
					<Item size="sm" className="p-0">
						<ItemContent className="gap-0.5">
							<ItemTitle>{contact.name}</ItemTitle>
							{contact.email && (
								<ItemDescription>{contact.email}</ItemDescription>
							)}
						</ItemContent>
					</Item>
				</a>
			);
		},
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
