import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatDate, truncateText } from "@/components/utils";
import { WarehouseManagementInboundShipmentItemsResponse } from "@/lib/pb.types";

type InboundShipmentItemResponse =
	WarehouseManagementInboundShipmentItemsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<InboundShipmentItemResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Inbound Shipment Item ID copied to clipboard");
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
		label: "Edit Inbound Shipment Item",
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
		label: "Delete Inbound Shipment Item",
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

export const columns: ColumnDef<InboundShipmentItemResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "inboundShipment",
		header: "Shipment ID",
	},
	{
		accessorKey: "product",
		header: "Product ID",
	},
	{
		accessorKey: "expectedQuantity",
		header: "Expected Quantity",
	},
	{
		accessorKey: "receivedQuantity",
		header: "Received Quantity",
		cell: ({ row }) => {
			const received = row.getValue("receivedQuantity") as number | undefined;
			return received ?? "-";
		},
	},
	{
		accessorKey: "discrepancyNotes",
		header: "Discrepancy Notes",
		cell: ({ row }) => {
			const notes = row.getValue("discrepancyNotes") as string | undefined;
			return notes ? truncateText(notes, 50) : "-";
		},
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
