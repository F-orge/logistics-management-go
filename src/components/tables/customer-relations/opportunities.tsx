import { ColumnDef } from "@tanstack/react-table";
import { CustomerRelationsOpportunitiesResponse } from "@/lib/pb.types";

type OpportunityResponse = CustomerRelationsOpportunitiesResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "Opportunity Name",
	},
	{
		accessorKey: "stage",
		header: "Stage",
		cell: ({ row }) => {
			const stage = row.getValue("stage") as string | undefined;
			const colors: Record<string, string> = {
				prospecting: "bg-blue-100 text-blue-800",
				qualification: "bg-blue-100 text-blue-800",
				"need-analysis": "bg-purple-100 text-purple-800",
				demo: "bg-yellow-100 text-yellow-800",
				proposal: "bg-orange-100 text-orange-800",
				negotiation: "bg-orange-100 text-orange-800",
				"closed-won": "bg-green-100 text-green-800",
				"closed-lost": "bg-red-100 text-red-800",
			};
			return (
				<span
					className={`px-2 py-1 rounded text-sm ${colors[stage || ""] || ""}`}
				>
					{stage ? stage.replace(/-/g, " ") : "-"}
				</span>
			);
		},
	},
	{
		accessorKey: "source",
		header: "Source",
		cell: ({ row }) => {
			const source = row.getValue("source") as string;
			return source.replace(/-/g, " ");
		},
	},
	{
		accessorKey: "dealValue",
		header: "Deal Value",
		cell: ({ row }) => {
			const value = row.getValue("dealValue") as number | undefined;
			return value
				? new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(value)
				: "-";
		},
	},
	{
		accessorKey: "probability",
		header: "Probability %",
		cell: ({ row }) => {
			const prob = row.getValue("probability") as number | undefined;
			return prob ? `${prob}%` : "-";
		},
	},
	{
		accessorKey: "expectedCloseDate",
		header: "Expected Close Date",
		cell: ({ row }) => {
			const date = row.getValue("expectedCloseDate") as string | undefined;
			return date ? new Date(date).toLocaleDateString() : "-";
		},
	},
	{
		accessorKey: "company",
		header: "Company ID",
	},
	{
		accessorKey: "contact",
		header: "Contact ID",
	},
	{
		accessorKey: "campaign",
		header: "Campaign ID",
	},
	{
		accessorKey: "created",
		header: "Created",
		cell: ({ row }) => {
			const date = row.getValue("created") as string;
			return new Date(date).toLocaleDateString();
		},
	},
] satisfies ColumnDef<OpportunityResponse>[];
