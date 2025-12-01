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
import { formatCurrency, formatDate, urlCell } from "@/components/utils";
import {
	CustomerRelationsCompaniesResponse,
	UsersRecord,
} from "@/lib/pb.types";

type CompanyResponse = CustomerRelationsCompaniesResponse<{
	owner?: UsersRecord;
}>;

export const options: RecordListOptions = { expand: "owner" };

export const actions: ContextMenuItem<CompanyResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Company ID copied to clipboard");
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
		label: "Edit Company",
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
		label: "Delete Company",
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

export const columns: ColumnDef<CompanyResponse>[] = [
	{
		accessorKey: "name",
		header: "Company Name",
		cell: ({ row }) => {
			const city = row.getValue("city") as string | undefined;
			const country = row.getValue("country") as string | undefined;
			const location = [city, country].filter(Boolean).join(", ");
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>{row.getValue("name")}</ItemTitle>
						{location && <ItemDescription>{location}</ItemDescription>}
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "industry",
		header: "Industry",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>{row.getValue("industry") || "-"}</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "annualRevenue",
		header: "Annual Revenue",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>
						{formatCurrency(
							row.getValue("annualRevenue") as number | undefined,
						)}
					</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "phoneNumber",
		header: "Phone Number",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>{row.getValue("phoneNumber") || "-"}</ItemTitle>
				</ItemContent>
			</Item>
		),
	},
	{
		accessorKey: "owner",
		header: "Owner",
		cell: ({ row }) => {
			const owner = row.original.expand?.owner as UsersRecord | undefined;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>
							{owner ? owner.name || owner.email : "Unassigned"}
						</ItemTitle>
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "website",
		header: "Website",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>
						{urlCell(row.getValue("website") as string | undefined)}
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
