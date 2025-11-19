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
  WarehouseManagementInventoryBatchesResponse,
  WarehouseManagementOutboundShipmentItemsResponse,
  WarehouseManagementOutboundShipmentsResponse,
  WarehouseManagementProductsResponse,
} from "@/lib/pb.types";

const OutboundShipmentItemRecord = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["outbound-shipment-item", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      return pocketbase
        .collection("warehouse_management_outbound_shipment_items")
        .getOne<
          WarehouseManagementOutboundShipmentItemsResponse & {
            expand?: {
              outboundShipment?: WarehouseManagementOutboundShipmentsResponse;
              product?: WarehouseManagementProductsResponse;
              batch?: WarehouseManagementInventoryBatchesResponse;
            };
          }
        >(searchQuery.id, { expand: "outboundShipment,product,batch" });
    },
  });

  if (!data) {
    return <ItemGroup>No outbound shipment item data available</ItemGroup>;
  }

  return (
    <ItemGroup className="gap-3">
      {/* Outbound Shipment */}
      {data.expand?.outboundShipment && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Package className="size-4" />
              Shipment
            </ItemTitle>
            <ItemDescription className="text-foreground font-mono">
              {data.outboundShipment}
            </ItemDescription>
            {data.expand.outboundShipment.trackingNumber && (
              <ItemDescription className="text-muted-foreground text-xs">
                Tracking: {data.expand.outboundShipment.trackingNumber}
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
                  data.expand.batch.expirationDate
                ).toLocaleDateString()}
              </ItemDescription>
            )}
          </ItemContent>
        </Item>
      )}

      {/* Quantity Shipped */}
      {data.quantityShipped !== null && data.quantityShipped !== undefined && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Package className="size-4" />
              Quantity Shipped
            </ItemTitle>
            <ItemDescription className="text-foreground font-medium text-lg">
              {data.quantityShipped.toLocaleString()}
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

export default OutboundShipmentItemRecord;
