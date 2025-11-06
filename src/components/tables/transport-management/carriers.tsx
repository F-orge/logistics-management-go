import { ColumnDef } from "@tanstack/react-table";
import { TransportManagementCarriersResponse } from "@/lib/pb.types";

type CarrierResponse = TransportManagementCarriersResponse;

export default [
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
		cell: ({ row }) => {
			const services = row.getValue("serviceOffered") as string | undefined;
			return services ? services.substring(0, 50) + "..." : "-";
		},
	},
	{
		accessorKey: "contactDetails",
		header: "Contact Details",
		cell: ({ row }) => {
			const details = row.getValue("contactDetails") as string | undefined;
			return details ? details.substring(0, 50) + "..." : "-";
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
] satisfies ColumnDef<CarrierResponse>[];
