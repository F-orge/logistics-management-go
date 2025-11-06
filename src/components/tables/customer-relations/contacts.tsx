import { ColumnDef } from "@tanstack/react-table";
import { CustomerRelationsContactsResponse } from "@/lib/pb.types";

type ContactResponse = CustomerRelationsContactsResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "Contact Name",
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => {
			const email = row.getValue("email") as string;
			return (
				<a href={`mailto:${email}`} className="text-blue-500 hover:underline">
					{email}
				</a>
			);
		},
	},
	{
		accessorKey: "phoneNumber",
		header: "Phone Number",
	},
	{
		accessorKey: "jobTitle",
		header: "Job Title",
	},
	{
		accessorKey: "company",
		header: "Company",
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
] satisfies ColumnDef<ContactResponse>[];
