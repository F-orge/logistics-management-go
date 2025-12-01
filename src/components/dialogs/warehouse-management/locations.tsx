import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import {
	Activity,
	AlertCircle,
	Barcode,
	Calendar,
	Package,
	Warehouse,
} from "lucide-react";
import React from "react";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@/components/ui/item";
import {
	WarehouseManagementLocationsResponse,
	WarehouseManagementWarehousesResponse,
} from "@/lib/pb.types";

const typeColors: Record<string, string> = {
	"receiving-dock": "text-[hsl(var(--chart-2))]",
	"pick-bin": "text-[hsl(var(--chart-3))]",
	"packing-station": "text-primary",
	"cross-dock-area": "text-[hsl(var(--chart-4))]",
	"bulk-storage": "text-muted-foreground",
	"reserve-storage": "text-muted-foreground",
	"damaged-goods": "text-destructive",
	"staging-area": "text-[hsl(var(--chart-5))]",
	"quality-control": "text-accent",
	"returns-area": "text-secondary-foreground",
};

const LocationRecord = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["location", searchQuery.id],
		queryFn: async () => {
			if (!searchQuery.id) return null;
			return pocketbase.collection("warehouse_management_locations").getOne<
				WarehouseManagementLocationsResponse & {
					expand?: {
						warehouse?: WarehouseManagementWarehousesResponse;
						parentLocation?: WarehouseManagementLocationsResponse;
					};
				}
			>(searchQuery.id, { expand: "warehouse,parentLocation" });
		},
	});

	if (!data) {
		return <ItemGroup>No location data available</ItemGroup>;
	}

	return (
		<ItemGroup className="gap-3">
			{/* Warehouse */}
			{data.expand?.warehouse && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Warehouse className="size-4" />
							Warehouse
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium">
							{data.expand.warehouse.name}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Name */}
			{data.name && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Package className="size-4" />
							Location Name
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium">
							{data.name}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Barcode */}
			{data.barcode && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Barcode className="size-4" />
							Barcode
						</ItemTitle>
						<ItemDescription className="text-foreground font-mono">
							{data.barcode}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Type */}
			{data.type && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Package className="size-4" />
							Type
						</ItemTitle>
						<ItemDescription
							className={`font-medium capitalize ${typeColors[data.type] || "text-gray-600"}`}
						>
							{data.type.replace(/-/g, " ")}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Level */}
			{data.level !== null && data.level !== undefined && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Activity className="size-4" />
							Level
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium">
							{data.level}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Parent Location */}
			{data.expand?.parentLocation && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Package className="size-4" />
							Parent Location
						</ItemTitle>
						<ItemDescription className="text-foreground font-medium">
							{data.expand.parentLocation.name}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Capacity Section */}
			<ItemGroup className="gap-3 border-t pt-3">
				<Item>
					<ItemContent>
						<ItemTitle className="flex items-center gap-2">
							<Package className="size-4" />
							Capacity Limits
						</ItemTitle>
					</ItemContent>
				</Item>

				{/* Max Weight */}
				{data.maxWeight !== null && data.maxWeight !== undefined && (
					<Item variant="outline">
						<ItemContent className="gap-1">
							<ItemTitle className="flex items-center gap-2">
								<AlertCircle className="size-4" />
								Max Weight
							</ItemTitle>
							<ItemDescription className="text-foreground font-medium">
								{data.maxWeight.toLocaleString()} kg
							</ItemDescription>
						</ItemContent>
					</Item>
				)}

				{/* Max Volume */}
				{data.maxVolume !== null && data.maxVolume !== undefined && (
					<Item variant="outline">
						<ItemContent className="gap-1">
							<ItemTitle className="flex items-center gap-2">
								<AlertCircle className="size-4" />
								Max Volume
							</ItemTitle>
							<ItemDescription className="text-foreground font-medium">
								{data.maxVolume.toLocaleString()} m³
							</ItemDescription>
						</ItemContent>
					</Item>
				)}

				{/* Max Pallets */}
				{data.maxPallets !== null && data.maxPallets !== undefined && (
					<Item variant="outline">
						<ItemContent className="gap-1">
							<ItemTitle className="flex items-center gap-2">
								<Package className="size-4" />
								Max Pallets
							</ItemTitle>
							<ItemDescription className="text-foreground font-medium">
								{data.maxPallets.toLocaleString()}
							</ItemDescription>
						</ItemContent>
					</Item>
				)}
			</ItemGroup>

			{/* Flags Section */}
			<ItemGroup className="gap-3 border-t pt-3">
				<Item>
					<ItemContent>
						<ItemTitle className="flex items-center gap-2">
							<Activity className="size-4" />
							Capabilities & Status
						</ItemTitle>
					</ItemContent>
				</Item>

				{/* Is Pickable */}
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Activity className="size-4" />
							Pickable
						</ItemTitle>
						<ItemDescription
							className={`font-medium ${
								data.isPickable
									? "text-[hsl(var(--chart-3))]"
									: "text-muted-foreground"
							}`}
						>
							{data.isPickable ? "✓ Enabled" : "✗ Disabled"}
						</ItemDescription>
					</ItemContent>
				</Item>

				{/* Is Receivable */}
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Activity className="size-4" />
							Receivable
						</ItemTitle>
						<ItemDescription
							className={`font-medium ${
								data.isReceivable
									? "text-[hsl(var(--chart-3))]"
									: "text-muted-foreground"
							}`}
						>
							{data.isReceivable ? "✓ Enabled" : "✗ Disabled"}
						</ItemDescription>
					</ItemContent>
				</Item>

				{/* Temperature Controlled */}
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Activity className="size-4" />
							Temperature Controlled
						</ItemTitle>
						<ItemDescription
							className={`font-medium ${
								data.temperatureControlled
									? "text-[hsl(var(--chart-2))]"
									: "text-muted-foreground"
							}`}
						>
							{data.temperatureControlled ? "✓ Yes" : "✗ No"}
						</ItemDescription>
					</ItemContent>
				</Item>

				{/* Hazmat Approved */}
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<AlertCircle className="size-4" />
							Hazmat Approved
						</ItemTitle>
						<ItemDescription
							className={`font-medium ${
								data.hazmatApproved
									? "text-[hsl(var(--chart-3))]"
									: "text-muted-foreground"
							}`}
						>
							{data.hazmatApproved ? "✓ Yes" : "✗ No"}
						</ItemDescription>
					</ItemContent>
				</Item>

				{/* Is Active */}
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Activity className="size-4" />
							Active
						</ItemTitle>
						<ItemDescription
							className={`font-medium ${
								data.isActive
									? "text-[hsl(var(--chart-3))]"
									: "text-destructive"
							}`}
						>
							{data.isActive ? "✓ Active" : "✗ Inactive"}
						</ItemDescription>
					</ItemContent>
				</Item>
			</ItemGroup>

			{/* Timestamps */}
			<ItemGroup className="gap-3 border-t pt-3">
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
		</ItemGroup>
	);
};

export default LocationRecord;
