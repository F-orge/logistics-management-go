import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
	formatDate,
	outboundShipmentStatusColors,
	statusBadgeCell,
} from "@/components/utils";
import { WarehouseManagementOutboundShipmentsResponse } from "@/lib/pb.types";

type OutboundShipmentResponse = WarehouseManagementOutboundShipmentsResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<OutboundShipmentResponse>[] = [
	{
		label: "Copy ID",
		icon: <Copy />,
		onSelect: (row) => {
			navigator.clipboard.writeText(row.original.id);
			toast.success("Outbound Shipment ID copied to clipboard");
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
		label: "Edit Outbound Shipment",
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
		label: "Delete Outbound Shipment",
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

export const columns: ColumnDef<OutboundShipmentResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "salesOrder",
		header: "Sales Order ID",
	},
	{
		accessorKey: "warehouse",
		header: "Warehouse ID",
	},
	{
		accessorKey: "trackingNumber",
		header: "Tracking Number",
		cell: ({ row }) => {
			const tracking = row.getValue("trackingNumber") as string;
			return (
				<span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
					{tracking}
				</span>
			);
		},
	},
	{
		accessorKey: "carrier",
		header: "Carrier ID",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) =>
			statusBadgeCell(
				row.getValue("status") as string,
				outboundShipmentStatusColors,
			),
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
