import { ColumnDef } from "@tanstack/react-table";
import { CustomerRelationsProductsResponse } from "@/lib/pb.types";

type ProductResponse = CustomerRelationsProductsResponse;

export default [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "Product Name",
	},
	{
		accessorKey: "sku",
		header: "SKU",
	},
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ row }) => {
			const type = row.getValue("type") as string;
			return type.charAt(0).toUpperCase() + type.slice(1);
		},
	},
	{
		accessorKey: "price",
		header: "Price",
		cell: ({ row }) => {
			const price = row.getValue("price") as number;
			return new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(price);
		},
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: ({ row }) => {
			const desc = row.getValue("description") as string | undefined;
			return desc ? desc.substring(0, 50) + "..." : "-";
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
] satisfies ColumnDef<ProductResponse>[];
