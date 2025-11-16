import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { coordinatesCell, formatDate } from "@/components/utils";
import { TransportManagementProofOfDeliveriesResponse } from "@/lib/pb.types";

type ProofOfDeliveryResponse = TransportManagementProofOfDeliveriesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<ProofOfDeliveryResponse>[] = [
	{
		label: "Edit Proof of Delivery",
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
		label: "Delete Proof of Delivery",
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

export const columns: ColumnDef<ProofOfDeliveryResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "tripStop",
		header: "Trip Stop ID",
	},
	{
		accessorKey: "coordinate",
		header: "Location",
		cell: ({ row }) => coordinatesCell(row.getValue("coordinate")),
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
