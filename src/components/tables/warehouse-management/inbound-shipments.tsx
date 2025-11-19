import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	formatDate,
	inboundShipmentStatusColors,
	statusBadgeCell,
} from "@/components/utils";
import { WarehouseManagementInboundShipmentsResponse } from "@/lib/pb.types";

type InboundShipmentResponse = WarehouseManagementInboundShipmentsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<InboundShipmentResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Inbound Shipment ID copied to clipboard");
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
		label: "Edit Inbound Shipment",
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
		label: "Delete Inbound Shipment",
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

export const columns: ColumnDef<InboundShipmentResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "warehouse",
		header: "Warehouse ID",
	},
	{
		accessorKey: "client",
		header: "Client ID",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) =>
			statusBadgeCell(
				row.getValue("status") as string,
				inboundShipmentStatusColors,
			),
	},
	{
		accessorKey: "expectedArrivalDate",
		header: "Expected Arrival",
		cell: ({ row }) => {
			const date = row.getValue("expectedArrivalDate") as string | undefined;
			return date ? formatDate(date) : "-";
		},
	},
	{
		accessorKey: "actualArrivalDate",
		header: "Actual Arrival",
		cell: ({ row }) => {
			const date = row.getValue("actualArrivalDate") as string | undefined;
			return date ? formatDate(date) : "-";
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
