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
  WarehouseManagementSalesOrderItemsResponse,
  WarehouseManagementSalesOrdersResponse,
} from "@/lib/pb.types";

const SalesOrderItemRecord = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["sales-order-item", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      return pocketbase
        .collection("warehouse_management_sales_order_items")
        .getOne<
          WarehouseManagementSalesOrderItemsResponse & {
            expand?: {
              salesOrder?: WarehouseManagementSalesOrdersResponse;
              product?: WarehouseManagementProductsResponse;
            };
          }
        >(searchQuery.id, { expand: "salesOrder,product" });
    },
  });

  if (!data) {
    return <ItemGroup>No sales order item data available</ItemGroup>;
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
            {data.expand.salesOrder.status && (
              <ItemDescription className="text-muted-foreground text-xs capitalize">
                Status: {data.expand.salesOrder.status}
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

      {/* Quantity Ordered */}
      {data.quantityOrdered !== null && data.quantityOrdered !== undefined && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Package className="size-4" />
              Quantity Ordered
            </ItemTitle>
            <ItemDescription className="text-foreground font-medium text-lg">
              {data.quantityOrdered.toLocaleString()}
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

export default SalesOrderItemRecord;
