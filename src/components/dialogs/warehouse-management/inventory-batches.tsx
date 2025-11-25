import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { Calendar, Package, Tag } from "lucide-react";
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
  WarehouseManagementProductsResponse,
} from "@/lib/pb.types";

const InventoryBatchRecord = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["inventory-batch", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      return pocketbase
        .collection("warehouse_management_inventory_batches")
        .getOne<
          WarehouseManagementInventoryBatchesResponse & {
            expand?: {
              product?: WarehouseManagementProductsResponse;
            };
          }
        >(searchQuery.id, { expand: "product" });
    },
  });

  if (!data) {
    return <ItemGroup>No inventory batch data available</ItemGroup>;
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

      {/* Batch Number */}
      {data.batchNumber && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Tag className="size-4" />
              Batch Number
            </ItemTitle>
            <ItemDescription className="text-foreground font-mono">
              {data.batchNumber}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Expiration Date */}
      {data.expirationDate && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Calendar className="size-4" />
              Expiration Date
            </ItemTitle>
            <ItemDescription className="text-foreground">
              {new Date(data.expirationDate).toLocaleDateString("en-US", {
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

export default InventoryBatchRecord;
