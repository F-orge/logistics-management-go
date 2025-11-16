import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { booleanBadgeCell, emailCell, formatDate } from "@/components/utils";
import { WarehouseManagementWarehousesResponse } from "@/lib/pb.types";

type WarehouseResponse = WarehouseManagementWarehousesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<WarehouseResponse>[] = [
	{
		label: "Edit Warehouse",
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
		label: "Delete Warehouse",
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

export const columns: ColumnDef<WarehouseResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "Warehouse Name",
	},
	{
		accessorKey: "address",
		header: "Address",
	},
	{
		accessorKey: "city",
		header: "City",
	},
	{
		accessorKey: "state",
		header: "State",
	},
	{
		accessorKey: "postalCode",
		header: "Postal Code",
	},
	{
		accessorKey: "country",
		header: "Country",
	},
	{
		accessorKey: "contactPerson",
		header: "Contact Person",
	},
	{
		accessorKey: "contactEmail",
		header: "Contact Email",
		cell: ({ row }) => emailCell(row.getValue("contactEmail") as string),
	},
	{
		accessorKey: "contactPhone",
		header: "Contact Phone",
	},
	{
		accessorKey: "timezone",
		header: "Timezone",
	},
	{
		accessorKey: "isActive",
		header: "Active",
		cell: ({ row }) => booleanBadgeCell(row.getValue("isActive") as boolean),
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
