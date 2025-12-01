import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { Calendar, FileText, Package } from "lucide-react";
import React from "react";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@/components/ui/item";
import {
	CustomerRelationsCompaniesResponse,
	CustomerRelationsOpportunitiesResponse,
	WarehouseManagementSalesOrdersResponse,
} from "@/lib/pb.types";

const statusColors: Record<string, string> = {
	pending: "text-[hsl(var(--chart-5))]",
	processing: "text-[hsl(var(--chart-4))]",
	shipped: "text-[hsl(var(--chart-2))]",
	completed: "text-[hsl(var(--chart-3))]",
	cancelled: "text-destructive",
};

const SalesOrderRecord = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["sales-order", searchQuery.id],
		queryFn: async () => {
			if (!searchQuery.id) return null;
			return pocketbase.collection("warehouse_management_sales_orders").getOne<
				WarehouseManagementSalesOrdersResponse & {
					expand?: {
						client?: CustomerRelationsCompaniesResponse;
						opportunity?: CustomerRelationsOpportunitiesResponse;
					};
				}
			>(searchQuery.id, { expand: "client,opportunity" });
		},
	});

	if (!data) {
		return <ItemGroup>No sales order data available</ItemGroup>;
	}

	return (
		<ItemGroup className="gap-3">
			{/* Order Number */}
			{data.orderNumber && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Package className="size-4" />
							Order Number
						</ItemTitle>
						<ItemDescription className="text-foreground font-mono text-lg font-semibold">
							{data.orderNumber}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Client */}
			{data.expand?.client && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Package className="size-4" />
							Client
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium">
							{data.expand.client.name}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Opportunity */}
			{data.expand?.opportunity && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Package className="size-4" />
							Opportunity
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium">
							{data.expand.opportunity.name}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Status */}
			{data.status && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Package className="size-4" />
							Status
						</ItemTitle>
						<ItemDescription
							className={`font-medium capitalize ${statusColors[data.status] || "text-foreground"}`}
						>
							{data.status}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Shipping Address */}
			{data.shippingAddress && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<FileText className="size-4" />
							Shipping Address
						</ItemTitle>
						<ItemDescription className="text-foreground text-sm">
							<div
								dangerouslySetInnerHTML={{ __html: data.shippingAddress }}
								className="prose prose-sm dark:prose-invert max-w-none"
							/>
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Created */}
			{data.created && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Calendar className="size-4" />
							Created
						</ItemTitle>
						<ItemDescription className="text-muted-foreground text-xs">
							{new Date(data.created).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Updated */}
			{data.updated && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Calendar className="size-4" />
							Updated
						</ItemTitle>
						<ItemDescription className="text-muted-foreground text-xs">
							{new Date(data.updated).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}
		</ItemGroup>
	);
};

export default SalesOrderRecord;
