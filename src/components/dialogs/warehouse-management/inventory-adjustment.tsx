import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { AlertCircle, Calendar, FileText, Package, User } from "lucide-react";
import React from "react";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@/components/ui/item";
import {
	UsersRecord,
	WarehouseManagementInventoryAdjustmentResponse,
	WarehouseManagementProductsResponse,
	WarehouseManagementWarehousesResponse,
} from "@/lib/pb.types";

const reasonColors: Record<string, string> = {
	"cycle-count": "text-[hsl(var(--chart-2))]",
	"damaged-goods": "text-destructive",
	theft: "text-destructive",
	expired: "text-[hsl(var(--chart-4))]",
	"return-to-vendor": "text-[hsl(var(--chart-5))]",
	"manual-correction": "text-primary",
};

const InventoryAdjustmentRecord = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["inventory-adjustment", searchQuery.id],
		queryFn: async () => {
			if (!searchQuery.id) return null;
			return pocketbase
				.collection("warehouse_management_inventory_adjustment")
				.getOne<
					WarehouseManagementInventoryAdjustmentResponse & {
						expand?: {
							product?: WarehouseManagementProductsResponse;
							user?: UsersRecord;
							warehouse?: WarehouseManagementWarehousesResponse;
						};
					}
				>(searchQuery.id, { expand: "product,user,warehouse" });
		},
	});

	if (!data) {
		return <ItemGroup>No inventory adjustment data available</ItemGroup>;
	}

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

			{/* Warehouse */}
			{data.expand?.warehouse && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<AlertCircle className="size-4" />
							Warehouse
						</ItemTitle>
						<ItemDescription className="text-foreground">
							{data.expand.warehouse.name}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Quantity Change */}
			{data.quantityChange !== null && data.quantityChange !== undefined && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Package className="size-4" />
							Quantity Change
						</ItemTitle>
						<ItemDescription
							className={`font-medium text-lg ${
								data.quantityChange > 0
									? "text-[hsl(var(--chart-3))]"
									: "text-destructive"
							}`}
						>
							{data.quantityChange > 0 ? "+" : ""}
							{data.quantityChange}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Reason */}
			{data.reason && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<AlertCircle className="size-4" />
							Reason
						</ItemTitle>
						<ItemDescription
							className={`font-medium capitalize ${reasonColors[data.reason] || "text-gray-600"}`}
						>
							{data.reason.replace(/-/g, " ")}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* User */}
			{data.expand?.user && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<User className="size-4" />
							Adjusted By
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium">
							{data.expand.user.name}
						</ItemDescription>
						{data.expand.user.email && (
							<ItemDescription className="text-muted-foreground text-xs">
								{data.expand.user.email}
							</ItemDescription>
						)}
					</ItemContent>
				</Item>
			)}

			{/* Notes */}
			{data.notes && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<FileText className="size-4" />
							Notes
						</ItemTitle>
						<ItemDescription className="text-foreground text-sm">
							<div
								dangerouslySetInnerHTML={{ __html: data.notes }}
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

export default InventoryAdjustmentRecord;
