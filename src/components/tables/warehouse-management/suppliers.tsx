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
import { WarehouseManagementSuppliersResponse } from "@/lib/pb.types";

type SupplierResponse = WarehouseManagementSuppliersResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<SupplierResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Supplier ID copied to clipboard");
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
		label: "Edit Supplier",
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
		label: "Delete Supplier",
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

export const columns: ColumnDef<SupplierResponse>[] = [
	{
		accessorKey: "name",
		header: "Supplier",
		cell: ({ row }) => {
			const contactPerson = row.original.contactPerson;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						<ItemTitle>{row.getValue("name") as string}</ItemTitle>
						{contactPerson && (
							<ItemDescription>{contactPerson}</ItemDescription>
						)}
					</ItemContent>
				</Item>
			);
		},
	},
	{
		accessorKey: "email",
		header: "Contact",
		cell: ({ row }) => {
			const email = row.original.email;
			const phone = row.original.phoneNumber;
			return (
				<Item size="sm" className="p-0">
					<ItemContent className="gap-0.5">
						{email && <ItemTitle>{emailCell(email)}</ItemTitle>}
						{phone && <ItemDescription>{phone}</ItemDescription>}
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
