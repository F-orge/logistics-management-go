import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { Package, Zap } from "lucide-react";
import React from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import {
  CustomerRelationsOpportunityProductsResponse,
  CustomerRelationsProductsResponse,
} from "@/lib/pb.types";

const OpportunityProductRecord = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["opportunity-product", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      return pocketbase
        .collection("customer_relations_opportunity_products")
        .getOne<
          CustomerRelationsOpportunityProductsResponse & {
            expand?: {
              product?: CustomerRelationsProductsResponse;
            };
          }
        >(searchQuery.id, { expand: "product" });
    },
  });

  if (!data) {
    return <ItemGroup>No opportunity product data available</ItemGroup>;
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
            <div className="space-y-1">
              <ItemDescription className="text-foreground font-medium">
                {data.expand.product.name}
              </ItemDescription>
              {data.expand.product.sku && (
                <ItemDescription className="text-muted-foreground text-xs">
                  SKU: {data.expand.product.sku}
                </ItemDescription>
              )}
              {data.expand.product.type && (
                <ItemDescription className="text-muted-foreground text-xs capitalize">
                  Type: {data.expand.product.type}
                </ItemDescription>
              )}
              {data.expand.product.price && (
                <ItemDescription className="text-foreground font-medium text-sm">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(data.expand.product.price)}
                </ItemDescription>
              )}
            </div>
          </ItemContent>
        </Item>
      )}

      {/* Quantity */}
      {data.quantity !== null && data.quantity !== undefined && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Zap className="size-4" />
              Quantity
            </ItemTitle>
            <ItemDescription className="text-foreground font-medium">
              {data.quantity} unit{data.quantity !== 1 ? "s" : ""}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}
    </ItemGroup>
  );
};

export default OpportunityProductRecord;
