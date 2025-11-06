import { ColumnDef } from "@tanstack/react-table";
import { CustomerRelationsInteractionsResponse } from "@/lib/pb.types";

type InteractionResponse = CustomerRelationsInteractionsResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ row }) => {
			const type = row.getValue("type") as string | undefined;
			const icons: Record<string, string> = {
				call: "📞",
				meeting: "🤝",
				text: "💬",
				email: "📧",
			};
			return (
				<span>
					{icons[type || ""]} {type || "-"}
				</span>
			);
		},
	},
	{
		accessorKey: "interactionDate",
		header: "Date",
		cell: ({ row }) => {
			const date = row.getValue("interactionDate") as string;
			return new Date(date).toLocaleDateString();
		},
	},
	{
		accessorKey: "outcome",
		header: "Outcome",
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
		accessorKey: "contact",
		header: "Contact ID",
	},
	{
		accessorKey: "user",
		header: "User ID",
	},
	{
		accessorKey: "case",
		header: "Case ID",
	},
] satisfies ColumnDef<InteractionResponse>[];
