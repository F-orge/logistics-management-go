import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { formatCurrency, formatDate, formatHyphens } from "@/components/utils";
import { TransportManagementCarrierRatesResponse } from "@/lib/pb.types";

type CarrierRateResponse = TransportManagementCarrierRatesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<CarrierRateResponse>[] = [
	{
		label: "Edit Carrier Rate",
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
		label: "Delete Carrier Rate",
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

export const columns: ColumnDef<CarrierRateResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "carrier",
		header: "Carrier ID",
	},
	{
		accessorKey: "origin",
		header: "Origin",
	},
	{
		accessorKey: "destination",
		header: "Destination",
	},
	{
		accessorKey: "serviceType",
		header: "Service Type",
	},
	{
		accessorKey: "rate",
		header: "Rate",
		cell: ({ row }) => formatCurrency(row.getValue("rate") as number),
	},
	{
		accessorKey: "unit",
		header: "Unit",
		cell: ({ row }) =>
			formatHyphens(row.getValue("unit") as string | undefined),
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
