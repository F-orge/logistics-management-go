import { ColumnDef } from "@tanstack/react-table";
import { TransportManagementVehicleMaintenanceResponse } from "@/lib/pb.types";

type VehicleMaintenanceResponse = TransportManagementVehicleMaintenanceResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "vehicle",
		header: "Vehicle ID",
	},
	{
		accessorKey: "serviceType",
		header: "Service Type",
	},
	{
		accessorKey: "serviceDate",
		header: "Service Date",
		cell: ({ row }) => {
			const date = row.getValue("serviceDate") as string;
			return new Date(date).toLocaleDateString();
		},
	},
	{
		accessorKey: "cost",
		header: "Cost",
		cell: ({ row }) => {
			const cost = row.getValue("cost") as number | undefined;
			return cost
				? new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(cost)
				: "-";
		},
	},
	{
		accessorKey: "notes",
		header: "Notes",
		cell: ({ row }) => {
			const notes = row.getValue("notes") as string | undefined;
			return notes ? notes.substring(0, 50) + "..." : "-";
		},
	},
	{
		accessorKey: "created",
		header: "Created",
		cell: ({ row }) => {
			const date = row.getValue("created") as string;
			return new Date(date).toLocaleDateString();
		},
	},
	{
		accessorKey: "updated",
		header: "Updated",
		cell: ({ row }) => {
			const date = row.getValue("updated") as string;
			return new Date(date).toLocaleDateString();
		},
	},
] satisfies ColumnDef<VehicleMaintenanceResponse>[];
