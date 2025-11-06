import { ColumnDef } from "@tanstack/react-table";
import { WarehouseManagementWarehousesResponse } from "@/lib/pb.types";

type WarehouseResponse = WarehouseManagementWarehousesResponse;

export default [
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
		cell: ({ row }) => {
			const email = row.getValue("contactEmail") as string | undefined;
			return email ? (
				<a href={`mailto:${email}`} className="text-blue-500 hover:underline">
					{email}
				</a>
			) : (
				"-"
			);
		},
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
		cell: ({ row }) => {
			const isActive = row.getValue("isActive") as boolean | undefined;
			return isActive ? (
				<span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
					Active
				</span>
			) : (
				<span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
					Inactive
				</span>
			);
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
] satisfies ColumnDef<WarehouseResponse>[];
