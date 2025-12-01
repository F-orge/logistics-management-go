import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { AlertCircle, Box, Calendar, Image, User } from "lucide-react";
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
	WarehouseManagementPackagesResponse,
	WarehouseManagementSalesOrdersResponse,
	WarehouseManagementWarehousesResponse,
} from "@/lib/pb.types";

const PackageRecord = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["package", searchQuery.id],
		queryFn: async () => {
			if (!searchQuery.id) return null;
			return pocketbase.collection("warehouse_management_packages").getOne<
				WarehouseManagementPackagesResponse & {
					expand?: {
						salesOrder?: WarehouseManagementSalesOrdersResponse;
						warehouse?: WarehouseManagementWarehousesResponse;
						packedByUser?: UsersRecord;
					};
				}
			>(searchQuery.id, { expand: "salesOrder,warehouse,packedByUser" });
		},
	});

	if (!data) {
		return <ItemGroup>No package data available</ItemGroup>;
	}

	return (
		<ItemGroup className="gap-3">
			{/* Package Number */}
			{data.packageNumber && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Box className="size-4" />
							Package Number
						</ItemTitle>
						<ItemDescription className="text-foreground font-mono text-lg font-semibold">
							{data.packageNumber}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Sales Order */}
			{data.expand?.salesOrder && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Box className="size-4" />
							Sales Order
						</ItemTitle>
						<ItemDescription className="text-foreground font-mono">
							{data.expand.salesOrder.orderNumber}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Warehouse */}
			{data.expand?.warehouse && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Box className="size-4" />
							Warehouse
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium">
							{data.expand.warehouse.name}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Type */}
			{data.type && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Box className="size-4" />
							Package Type
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium capitalize">
							{data.type}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Dimensions Section */}
			<ItemGroup className="gap-3 border-t pt-3">
				<Item>
					<ItemContent>
						<ItemTitle className="flex items-center gap-2">
							<Box className="size-4" />
							Dimensions & Weight
						</ItemTitle>
					</ItemContent>
				</Item>

				{/* Length */}
				{data.length !== null && data.length !== undefined && (
					<Item variant="outline">
						<ItemContent className="gap-1">
							<ItemTitle className="text-xs font-medium">Length</ItemTitle>
							<ItemDescription className="text-foreground">
								{data.length} cm
							</ItemDescription>
						</ItemContent>
					</Item>
				)}

				{/* Width */}
				{data.width !== null && data.width !== undefined && (
					<Item variant="outline">
						<ItemContent className="gap-1">
							<ItemTitle className="text-xs font-medium">Width</ItemTitle>
							<ItemDescription className="text-foreground">
								{data.width} cm
							</ItemDescription>
						</ItemContent>
					</Item>
				)}

				{/* Height */}
				{data.height !== null && data.height !== undefined && (
					<Item variant="outline">
						<ItemContent className="gap-1">
							<ItemTitle className="text-xs font-medium">Height</ItemTitle>
							<ItemDescription className="text-foreground">
								{data.height} cm
							</ItemDescription>
						</ItemContent>
					</Item>
				)}

				{/* Weight */}
				{data.weight !== null && data.weight !== undefined && (
					<Item variant="outline">
						<ItemContent className="gap-1">
							<ItemTitle className="text-xs font-medium">Weight</ItemTitle>
							<ItemDescription className="text-foreground font-medium">
								{data.weight} kg
							</ItemDescription>
						</ItemContent>
					</Item>
				)}
			</ItemGroup>

			{/* Handling Flags Section */}
			<ItemGroup className="gap-3 border-t pt-3">
				<Item>
					<ItemContent>
						<ItemTitle className="flex items-center gap-2">
							<AlertCircle className="size-4" />
							Handling & Requirements
						</ItemTitle>
					</ItemContent>
				</Item>

				{/* Is Fragile */}
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="text-xs font-medium">Fragile</ItemTitle>
						<ItemDescription
							className={`font-medium ${
								data.isFragile
									? "text-[hsl(var(--chart-4))]"
									: "text-muted-foreground"
							}`}
						>
							{data.isFragile ? "⚠ Yes" : "✓ No"}
						</ItemDescription>
					</ItemContent>
				</Item>

				{/* Is Hazmat */}
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="text-xs font-medium">
							Hazardous Material
						</ItemTitle>
						<ItemDescription
							className={`font-medium ${
								data.isHazmat ? "text-destructive" : "text-muted-foreground"
							}`}
						>
							{data.isHazmat ? "⚠ Yes" : "✓ No"}
						</ItemDescription>
					</ItemContent>
				</Item>

				{/* Require Signature */}
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="text-xs font-medium">
							Signature Required
						</ItemTitle>
						<ItemDescription
							className={`font-medium ${
								data.requireSignature
									? "text-[hsl(var(--chart-2))]"
									: "text-muted-foreground"
							}`}
						>
							{data.requireSignature ? "✓ Yes" : "✗ No"}
						</ItemDescription>
					</ItemContent>
				</Item>
			</ItemGroup>

			{/* Insurance & Packing Section */}
			<ItemGroup className="gap-3 border-t pt-3">
				{/* Insurance Value */}
				{data.insuranceValue !== null && data.insuranceValue !== undefined && (
					<Item variant="outline">
						<ItemContent className="gap-1">
							<ItemTitle className="flex items-center gap-2">
								<Box className="size-4" />
								Insurance Value
							</ItemTitle>
							<ItemDescription className="text-foreground font-medium">
								${data.insuranceValue.toFixed(2)}
							</ItemDescription>
						</ItemContent>
					</Item>
				)}

				{/* Packed By User */}
				{data.expand?.packedByUser && (
					<Item variant="outline">
						<ItemContent className="gap-1">
							<ItemTitle className="flex items-center gap-2">
								<User className="size-4" />
								Packed By
							</ItemTitle>
							<ItemDescription className="text-foreground font-medium">
								{data.expand.packedByUser.name}
							</ItemDescription>
						</ItemContent>
					</Item>
				)}

				{/* Packed At */}
				{data.packedAt && (
					<Item variant="outline">
						<ItemContent className="gap-1">
							<ItemTitle className="flex items-center gap-2">
								<Calendar className="size-4" />
								Packed At
							</ItemTitle>
							<ItemDescription className="text-foreground">
								{new Date(data.packedAt).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</ItemDescription>
						</ItemContent>
					</Item>
				)}

				{/* Shipped At */}
				{data.shippedAt && (
					<Item variant="outline">
						<ItemContent className="gap-1">
							<ItemTitle className="flex items-center gap-2">
								<Calendar className="size-4" />
								Shipped At
							</ItemTitle>
							<ItemDescription className="text-foreground">
								{new Date(data.shippedAt).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</ItemDescription>
						</ItemContent>
					</Item>
				)}
			</ItemGroup>

			{/* Images */}
			{data.images && data.images.length > 0 && (
				<ItemGroup className="gap-3 border-t pt-3">
					<Item>
						<ItemContent>
							<ItemTitle className="flex items-center gap-2">
								<Image className="size-4" />
								Package Images ({data.images.length})
							</ItemTitle>
						</ItemContent>
					</Item>
					<div className="grid grid-cols-3 gap-2">
						{data.images.map((image) => (
							<a
								key={image}
								href={pocketbase.getFileUrl(data, image)}
								target="_blank"
								rel="noopener noreferrer"
								className="rounded border border-border overflow-hidden hover:border-primary transition-colors"
							>
								<img
									src={pocketbase.getFileUrl(data, image)}
									alt="Package"
									className="w-full h-24 object-cover"
								/>
							</a>
						))}
					</div>
				</ItemGroup>
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

export default PackageRecord;
