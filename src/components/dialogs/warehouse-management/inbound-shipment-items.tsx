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
  WarehouseManagementInboundShipmentItemsResponse,
  WarehouseManagementInboundShipmentsResponse,
  WarehouseManagementProductsResponse,
} from "@/lib/pb.types";

const InboundShipmentItemRecord = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["inbound-shipment-item", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      return pocketbase
        .collection("warehouse_management_inbound_shipment_items")
        .getOne<
          WarehouseManagementInboundShipmentItemsResponse & {
            expand?: {
              inboundShipment?: WarehouseManagementInboundShipmentsResponse;
              product?: WarehouseManagementProductsResponse;
            };
          }
        >(searchQuery.id, { expand: "inboundShipment,product" });
    },
  });

  if (!data) {
    return <ItemGroup>No inbound shipment item data available</ItemGroup>;
  }

  const discrepancy =
    data.receivedQuantity !== null && data.expectedQuantity !== null
      ? data.receivedQuantity - data.expectedQuantity
      : 0;

  return (
    <ItemGroup className="gap-3">
      {/* Inbound Shipment */}
      {data.expand?.inboundShipment && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Package className="size-4" />
              Shipment
            </ItemTitle>
            <ItemDescription className="text-foreground font-mono">
              {data.inboundShipment}
            </ItemDescription>
            {data.expand.inboundShipment.status && (
              <ItemDescription className="text-muted-foreground text-xs capitalize">
                Status: {data.expand.inboundShipment.status}
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
      {data.expectedQuantity !== null &&
        data.expectedQuantity !== undefined && (
          <Item variant="outline">
            <ItemContent className="gap-1">
              <ItemTitle className="flex items-center gap-2">
                <Package className="size-4" />
                Expected Quantity
              </ItemTitle>
              <ItemDescription className="text-foreground font-medium">
                {data.expectedQuantity.toLocaleString()}
              </ItemDescription>
            </ItemContent>
          </Item>
        )}

      {/* Received Quantity */}
      {data.receivedQuantity !== null &&
        data.receivedQuantity !== undefined && (
          <Item variant="outline">
            <ItemContent className="gap-1">
              <ItemTitle className="flex items-center gap-2">
                <Package className="size-4" />
                Received Quantity
              </ItemTitle>
              <ItemDescription className="text-foreground font-medium">
                {data.receivedQuantity.toLocaleString()}
              </ItemDescription>
            </ItemContent>
          </Item>
        )}

      {/* Discrepancy */}
      {data.expectedQuantity !== null && data.receivedQuantity !== null && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Package className="size-4" />
              Discrepancy
            </ItemTitle>
            <ItemDescription
              className={`font-medium ${
                discrepancy === 0
                  ? "text-[hsl(var(--chart-3))]"
                  : discrepancy > 0
                    ? "text-[hsl(var(--chart-2))]"
                    : "text-destructive"
              }`}
            >
              {discrepancy > 0 ? "+" : ""}
              {discrepancy.toLocaleString()}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Discrepancy Notes */}
      {data.discrepancyNotes && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <FileText className="size-4" />
              Discrepancy Notes
            </ItemTitle>
            <ItemDescription className="text-foreground text-sm">
              <div
                dangerouslySetInnerHTML={{ __html: data.discrepancyNotes }}
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

export default InboundShipmentItemRecord;
