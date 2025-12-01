import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { Calendar, Package } from "lucide-react";
import React from "react";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@/components/ui/item";
import {
	WarehouseManagementProductsResponse,
	WarehouseManagementReturnItemsResponse,
	WarehouseManagementReturnsResponse,
} from "@/lib/pb.types";

const conditionColors: Record<string, string> = {
	sellable: "text-[hsl(var(--chart-3))]",
	damaged: "text-destructive",
	defective: "text-[hsl(var(--chart-4))]",
	expired: "text-[hsl(var(--chart-4))]",
	unsellable: "text-destructive",
};

const ReturnItemRecord = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["return-item", searchQuery.id],
		queryFn: async () => {
			if (!searchQuery.id) return null;
			return pocketbase.collection("warehouse_management_return_items").getOne<
				WarehouseManagementReturnItemsResponse & {
					expand?: {
						return?: WarehouseManagementReturnsResponse;
						product?: WarehouseManagementProductsResponse;
					};
				}
			>(searchQuery.id, { expand: "return,product" });
		},
	});

	if (!data) {
		return <ItemGroup>No return item data available</ItemGroup>;
	}

	return (
		<ItemGroup className="gap-3">
			{/* Return */}
			{data.expand?.return && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Package className="size-4" />
							Return
						</ItemTitle>
						<ItemDescription className="text-foreground font-mono">
							{data.expand.return.returnNumber}
						</ItemDescription>
						{data.expand.return.status && (
							<ItemDescription className="text-muted-foreground text-xs capitalize">
								Status: {data.expand.return.status}
							</ItemDescription>
						)}
					</ItemContent>
				</Item>
			)}

			{/* Product */}
			{data.expand?.product && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Package className="size-4" />
							Product
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium">
							{data.expand.product.name}
						</ItemDescription>
						{data.expand.product.sku && (
							<ItemDescription className="text-muted-foreground text-xs">
								SKU: {data.expand.product.sku}
							</ItemDescription>
						)}
					</ItemContent>
				</Item>
			)}

			{/* Expected Quantity */}
			{data.quantityExpected !== null &&
				data.quantityExpected !== undefined && (
					<Item variant="outline">
						<ItemContent className="gap-1">
							<ItemTitle className="flex items-center gap-2">
								<Package className="size-4" />
								Expected Quantity
							</ItemTitle>
							<ItemDescription className="text-foreground font-medium">
								{data.quantityExpected.toLocaleString()}
							</ItemDescription>
						</ItemContent>
					</Item>
				)}

			{/* Quantity Received */}
			{data.quantityReceived !== null &&
				data.quantityReceived !== undefined && (
					<Item variant="outline">
						<ItemContent className="gap-1">
							<ItemTitle className="flex items-center gap-2">
								<Package className="size-4" />
								Quantity Received
							</ItemTitle>
							<ItemDescription className="text-foreground font-medium">
								{data.quantityReceived.toLocaleString()}
							</ItemDescription>
						</ItemContent>
					</Item>
				)}

			{/* Condition */}
			{data.condition && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Package className="size-4" />
							Item Condition
						</ItemTitle>
						<ItemDescription
							className={`font-medium capitalize ${conditionColors[data.condition] || "text-foreground"}`}
						>
							{data.condition}
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

export default ReturnItemRecord;
