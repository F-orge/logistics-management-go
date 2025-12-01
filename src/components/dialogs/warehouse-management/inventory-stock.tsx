import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { AlertCircle, Calendar, Package, Warehouse } from "lucide-react";
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
	WarehouseManagementInventoryStockResponse,
	WarehouseManagementLocationsResponse,
	WarehouseManagementProductsResponse,
} from "@/lib/pb.types";

const statusColors: Record<string, string> = {
	available: "text-[hsl(var(--chart-3))]",
	allocated: "text-[hsl(var(--chart-2))]",
	damaged: "text-destructive",
	quarantine: "text-[hsl(var(--chart-4))]",
	hold: "text-[hsl(var(--chart-5))]",
	shipped: "text-primary",
	expired: "text-destructive",
};

const InventoryStockRecord = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["inventory-stock", searchQuery.id],
		queryFn: async () => {
			if (!searchQuery.id) return null;
			return pocketbase
				.collection("warehouse_management_inventory_stock")
				.getOne<
					WarehouseManagementInventoryStockResponse & {
						expand?: {
							location?: WarehouseManagementLocationsResponse;
							product?: WarehouseManagementProductsResponse;
							batch?: WarehouseManagementInventoryBatchesResponse;
						};
					}
				>(searchQuery.id, { expand: "location,product,batch" });
		},
	});

	if (!data) {
		return <ItemGroup>No inventory stock data available</ItemGroup>;
	}

	const availableQuantity = data.quantity - data.reservedQuantity;

	return (
		<ItemGroup className="gap-3">
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

			{/* Location */}
			{data.expand?.location && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Warehouse className="size-4" />
							Location
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium">
							{data.expand.location.name}
						</ItemDescription>
						{data.expand.location.barcode && (
							<ItemDescription className="text-muted-foreground text-xs">
								Barcode: {data.expand.location.barcode}
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

			{/* Total Quantity */}
			{data.quantity !== null && data.quantity !== undefined && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Package className="size-4" />
							Total Quantity
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium text-lg">
							{data.quantity.toLocaleString()}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Reserved Quantity */}
			{data.reservedQuantity !== null &&
				data.reservedQuantity !== undefined && (
					<Item variant="outline">
						<ItemContent className="gap-1">
							<ItemTitle className="flex items-center gap-2">
								<AlertCircle className="size-4" />
								Reserved Quantity
							</ItemTitle>
							<ItemDescription className="text-[hsl(var(--chart-4))] font-medium">
								{data.reservedQuantity.toLocaleString()}
							</ItemDescription>
						</ItemContent>
					</Item>
				)}

			{/* Available Quantity */}
			<Item variant="outline">
				<ItemContent className="gap-1">
					<ItemTitle className="flex items-center gap-2">
						<Package className="size-4" />
						Available Quantity
					</ItemTitle>
					<ItemDescription
						className={`font-medium text-lg ${
							availableQuantity > 0
								? "text-[hsl(var(--chart-3))]"
								: "text-destructive"
						}`}
					>
						{availableQuantity.toLocaleString()}
					</ItemDescription>
				</ItemContent>
			</Item>

			{/* Status */}
			{data.status && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<AlertCircle className="size-4" />
							Status
						</ItemTitle>
						<ItemDescription
							className={`font-medium capitalize ${statusColors[data.status] || "text-gray-600"}`}
						>
							{data.status}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Last Counted At */}
			{data.lastCountedAt && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Calendar className="size-4" />
							Last Counted
						</ItemTitle>
						<ItemDescription className="text-foreground">
							{new Date(data.lastCountedAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Last Movement At */}
			{data.lastMovementAt && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Calendar className="size-4" />
							Last Movement
						</ItemTitle>
						<ItemDescription className="text-foreground">
							{new Date(data.lastMovementAt).toLocaleDateString("en-US", {
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

export default InventoryStockRecord;
