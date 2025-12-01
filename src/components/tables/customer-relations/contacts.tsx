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
import { emailCell, formatDate } from "@/components/utils";
import {
	CustomerRelationsCompaniesResponse,
	CustomerRelationsContactsResponse,
	UsersRecord,
} from "@/lib/pb.types";

type ContactResponse = CustomerRelationsContactsResponse<{
	owner?: UsersRecord;
	company?: CustomerRelationsCompaniesResponse;
}>;

export const options: RecordListOptions = { expand: "owner,company" };

export const actions: ContextMenuItem<ContactResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Contact ID copied to clipboard");
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
		label: "Edit Contact",
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
		label: "Delete Contact",
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

export const columns: ColumnDef<ContactResponse>[] = [
	{
		accessorKey: "name",
		header: "Contact Name",
		cell: ({ row }) => {
			const jobTitle = row.getValue("jobTitle") as string | undefined;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>{row.getValue("name")}</ItemTitle>
						{jobTitle && <ItemDescription>{jobTitle}</ItemDescription>}
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => (
			<Item size="sm" className="p-0">
				<ItemContent className="gap-0.5">
					<ItemTitle>{emailCell(row.getValue("email") as string)}</ItemTitle>
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
		accessorKey: "company",
		header: "Company",
		cell: ({ row }) => {
			const company = row.original.expand?.company as
				| CustomerRelationsCompaniesResponse
				| undefined;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>{company?.name || "-"}</ItemTitle>
					</ItemContent>
				</Item>
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
