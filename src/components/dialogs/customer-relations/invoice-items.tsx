import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { DollarSign, FileText, ShoppingCart } from "lucide-react";
import React from "react";
import { Dialog } from "@/components/ui/dialog";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@/components/ui/item";
import { CustomerRelationsInvoiceItemsResponse } from "@/lib/pb.types";

const InvoiceItemRecord = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["invoiceItem", searchQuery.id],
		queryFn: async () => {
			if (!searchQuery.id) return null;
			return pocketbase.collection("customer_relations_invoice_items").getOne<
				CustomerRelationsInvoiceItemsResponse & {
					expand?: {
						invoice?: any;
						product?: any;
					};
				}
			>(searchQuery.id, { expand: "invoice,product" });
		},
	});

	if (!data) {
		return <ItemGroup>No invoice item data available</ItemGroup>;
	}

	const lineTotal = data.quantity * data.price;

	return (
		<ItemGroup className="gap-3">
			{/* Quantity */}
			<Item variant="outline">
				<ItemContent className="gap-1">
					<ItemTitle className="flex items-center gap-2">
						<ShoppingCart className="size-4" />
						Quantity
					</ItemTitle>
					<ItemDescription className="text-foreground font-medium">
						{data.quantity}
					</ItemDescription>
				</ItemContent>
			</Item>

			{/* Unit Price */}
			<Item variant="outline">
				<ItemContent className="gap-1">
					<ItemTitle className="flex items-center gap-2">
						<DollarSign className="size-4" />
						Unit Price
					</ItemTitle>
					<ItemDescription className="text-foreground">
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(data.price)}
					</ItemDescription>
				</ItemContent>
			</Item>

			{/* Line Total */}
			<Item variant="outline">
				<ItemContent className="gap-1">
					<ItemTitle className="flex items-center gap-2">
						<DollarSign className="size-4" />
						Line Total
					</ItemTitle>
					<ItemDescription className="text-foreground font-bold text-lg">
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(lineTotal)}
					</ItemDescription>
				</ItemContent>
			</Item>

			{/* Product - Relation */}
			{data.expand?.product && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<ShoppingCart className="size-4" />
							Product
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium">
							{data.expand.product.name}
						</ItemDescription>
						{data.expand.product.description && (
							<ItemDescription className="text-muted-foreground text-xs">
								{data.expand.product.description}
							</ItemDescription>
						)}
					</ItemContent>
				</Item>
			)}

			{/* Invoice - Relation */}
			{data.expand?.invoice && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<FileText className="size-4" />
							Invoice
						</ItemTitle>
						<ItemDescription className="text-foreground font-mono">
							{data.expand.invoice.invoiceNumber}
						</ItemDescription>
						{data.expand.invoice.status && (
							<ItemDescription className="text-muted-foreground text-xs capitalize">
								{data.expand.invoice.status}
							</ItemDescription>
						)}
					</ItemContent>
				</Item>
			)}

			{/* Metadata */}
			<Item variant="muted" size="sm">
				<ItemContent className="gap-1">
					<ItemDescription className="text-xs text-muted-foreground">
						Created: {new Date(data.created).toLocaleDateString()}
					</ItemDescription>
					<ItemDescription className="text-xs text-muted-foreground">
						Updated: {new Date(data.updated).toLocaleDateString()}
					</ItemDescription>
					<ItemDescription className="text-xs text-muted-foreground">
						ID: {data.id}
					</ItemDescription>
				</ItemContent>
			</Item>
		</ItemGroup>
	);
};

export default InvoiceItemRecord;
