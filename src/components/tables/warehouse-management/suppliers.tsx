import { ColumnDef } from "@tanstack/react-table";
import { WarehouseManagementSuppliersResponse } from "@/lib/pb.types";

type SupplierResponse = WarehouseManagementSuppliersResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "Supplier Name",
	},
	{
		accessorKey: "contactPerson",
		header: "Contact Person",
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => {
			const email = row.getValue("email") as string | undefined;
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
		accessorKey: "phoneNumber",
		header: "Phone Number",
	},
	{
		accessorKey: "client",
		header: "Client ID",
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
] satisfies ColumnDef<SupplierResponse>[];
