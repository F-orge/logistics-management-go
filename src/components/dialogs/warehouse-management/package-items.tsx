import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { Box, Calendar, Package } from "lucide-react";
import React from "react";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@/components/ui/item";
import {
	WarehouseManagementInventoryBatchesResponse,
	WarehouseManagementPackageItemsResponse,
	WarehouseManagementPackagesResponse,
	WarehouseManagementProductsResponse,
} from "@/lib/pb.types";

const PackageItemRecord = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["package-item", searchQuery.id],
		queryFn: async () => {
			if (!searchQuery.id) return null;
			return pocketbase.collection("warehouse_management_package_items").getOne<
				WarehouseManagementPackageItemsResponse & {
					expand?: {
						package?: WarehouseManagementPackagesResponse;
						product?: WarehouseManagementProductsResponse;
						batch?: WarehouseManagementInventoryBatchesResponse;
					};
				}
			>(searchQuery.id, { expand: "package,product,batch" });
		},
	});

	if (!data) {
		return <ItemGroup>No package item data available</ItemGroup>;
	}

	return (
		<ItemGroup className="gap-3">
			{/* Package */}
			{data.expand?.package && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Box className="size-4" />
							Package
						</ItemTitle>
						<ItemDescription className="text-foreground font-mono">
							{data.expand.package.packageNumber}
						</ItemDescription>
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

			{/* Batch */}
			{data.expand?.batch && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Package className="size-4" />
							Batch/Lot
						</ItemTitle>
						<ItemDescription className="text-foreground font-mono">
							{data.expand.batch.batchNumber}
						</ItemDescription>
						{data.expand.batch.expirationDate && (
							<ItemDescription className="text-muted-foreground text-xs">
								Expires:{" "}
								{new Date(
									data.expand.batch.expirationDate,
								).toLocaleDateString()}
							</ItemDescription>
						)}
					</ItemContent>
				</Item>
			)}

			{/* Quantity */}
			{data.quantity !== null && data.quantity !== undefined && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Package className="size-4" />
							Quantity
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium text-lg">
							{data.quantity.toLocaleString()}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Lot Number */}
			{data.lotNumber && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Package className="size-4" />
							Lot Number
						</ItemTitle>
						<ItemDescription className="text-foreground font-mono">
							{data.lotNumber}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Expiry Date */}
			{data.expiryDate && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Calendar className="size-4" />
							Expiry Date
						</ItemTitle>
						<ItemDescription className="text-foreground">
							{new Date(data.expiryDate).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
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

export default PackageItemRecord;
