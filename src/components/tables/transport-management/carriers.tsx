import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatDate, truncateText } from "@/components/utils";
import { TransportManagementCarriersResponse } from "@/lib/pb.types";

type CarrierResponse = TransportManagementCarriersResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<CarrierResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Carrier ID copied to clipboard");
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
		label: "Edit Carrier",
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
		label: "Delete Carrier",
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

export const columns: ColumnDef<CarrierResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "Carrier Name",
	},
	{
		accessorKey: "serviceOffered",
		header: "Services",
		cell: ({ row }) =>
			truncateText(row.getValue("serviceOffered") as string | undefined, 50),
	},
	{
		accessorKey: "contactDetails",
		header: "Contact Details",
		cell: ({ row }) =>
			truncateText(row.getValue("contactDetails") as string | undefined, 50),
	},
	{
		accessorKey: "created",
		header: "Created",
		cell: ({ row }) => formatDate(row.getValue("created") as string),
	},
	{
		accessorKey: "updated",
		header: "Updated",
		cell: ({ row }) => formatDate(row.getValue("updated") as string),
	},
];
