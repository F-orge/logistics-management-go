import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { Calendar, Package, Truck, Warehouse } from "lucide-react";
import React from "react";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@/components/ui/item";
import {
	WarehouseManagementOutboundShipmentsResponse,
	WarehouseManagementSalesOrdersResponse,
	WarehouseManagementWarehousesResponse,
} from "@/lib/pb.types";

const statusColors: Record<string, string> = {
	picking: "text-[hsl(var(--chart-4))]",
	packed: "text-[hsl(var(--chart-5))]",
	shipped: "text-[hsl(var(--chart-2))]",
	delivered: "text-[hsl(var(--chart-3))]",
	cancelled: "text-destructive",
};

const OutboundShipmentRecord = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["outbound-shipment", searchQuery.id],
		queryFn: async () => {
			if (!searchQuery.id) return null;
			return pocketbase
				.collection("warehouse_management_outbound_shipments")
				.getOne<
					WarehouseManagementOutboundShipmentsResponse & {
						expand?: {
							salesOrder?: WarehouseManagementSalesOrdersResponse;
							warehouse?: WarehouseManagementWarehousesResponse;
						};
					}
				>(searchQuery.id, { expand: "salesOrder,warehouse" });
		},
	});

	if (!data) {
		return <ItemGroup>No outbound shipment data available</ItemGroup>;
	}

	return (
		<ItemGroup className="gap-3">
			{/* Sales Order */}
			{data.expand?.salesOrder && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Package className="size-4" />
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

			{/* Tracking Number */}
			{data.trackingNumber && (
				<Item variant="outline">
					<ItemContent className="gap-1">
						<ItemTitle className="flex items-center gap-2">
							<Truck className="size-4" />
							Tracking Number
						</ItemTitle>
						<ItemDescription className="text-foreground font-mono">
							{data.trackingNumber}
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

export default OutboundShipmentRecord;
