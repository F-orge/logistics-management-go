import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { Calendar, Package, Warehouse } from "lucide-react";
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
	WarehouseManagementInboundShipmentsResponse,
	WarehouseManagementWarehousesResponse,
} from "@/lib/pb.types";

const statusColors: Record<string, string> = {
	pending: "text-[hsl(var(--chart-5))]",
	arrived: "text-[hsl(var(--chart-3))]",
	processing: "text-[hsl(var(--chart-2))]",
	completed: "text-[hsl(var(--chart-3))]",
	cancelled: "text-destructive",
};

const InboundShipmentRecord = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["inbound-shipment", searchQuery.id],
		queryFn: async () => {
			if (!searchQuery.id) return null;
			return pocketbase
				.collection("warehouse_management_inbound_shipments")
				.getOne<
					WarehouseManagementInboundShipmentsResponse & {
						expand?: {
							client?: CustomerRelationsCompaniesResponse;
							warehouse?: WarehouseManagementWarehousesResponse;
						};
					}
				>(searchQuery.id, { expand: "client,warehouse" });
		},
	});

	if (!data) {
		return <ItemGroup>No inbound shipment data available</ItemGroup>;
	}

	return (
		<ItemGroup className="gap-3">
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

			{/* Expected Arrival Date */}
			{data.expectedArrivalDate && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Calendar className="size-4" />
							Expected Arrival
						</ItemTitle>
						<ItemDescription className="text-foreground">
							{new Date(data.expectedArrivalDate).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</ItemDescription>
					</ItemContent>
				</Item>
			)}

			{/* Actual Arrival Date */}
			{data.actualArrivalDate && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Calendar className="size-4" />
							Actual Arrival
						</ItemTitle>
						<ItemDescription className="text-foreground">
							{new Date(data.actualArrivalDate).toLocaleDateString("en-US", {
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

export default InboundShipmentRecord;
