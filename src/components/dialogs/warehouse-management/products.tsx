import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { Barcode, Box, Calendar, FileText, Image, Package } from "lucide-react";
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
  WarehouseManagementProductsResponse,
  WarehouseManagementSuppliersResponse,
} from "@/lib/pb.types";

const statusColors: Record<string, string> = {
  active: "text-[hsl(var(--chart-3))]",
  discontinued: "text-[hsl(var(--chart-4))]",
  obsolete: "text-destructive",
  inactive: "text-muted-foreground",
};

const ProductRecord = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["product", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      return pocketbase.collection("warehouse_management_products").getOne<
        WarehouseManagementProductsResponse & {
          expand?: {
            supplier?: WarehouseManagementSuppliersResponse;
            client?: CustomerRelationsCompaniesResponse;
          };
        }
      >(searchQuery.id, { expand: "supplier,client" });
    },
  });

  if (!data) {
    return <ItemGroup>No product data available</ItemGroup>;
  }

  return (
    <ItemGroup className="gap-3">
      {/* Name */}
      {data.name && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Package className="size-4" />
              Product Name
            </ItemTitle>
            <ItemDescription className="text-foreground font-medium">
              {data.name}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* SKU */}
      {data.sku && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Barcode className="size-4" />
              SKU
            </ItemTitle>
            <ItemDescription className="text-foreground font-mono">
              {data.sku}
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

      {/* Supplier */}
      {data.expand?.supplier && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Package className="size-4" />
              Supplier
            </ItemTitle>
            <ItemDescription className="text-foreground font-medium">
              {data.expand.supplier.name}
            </ItemDescription>
            {data.expand.supplier.contactPerson && (
              <ItemDescription className="text-muted-foreground text-xs">
                Contact: {data.expand.supplier.contactPerson}
              </ItemDescription>
            )}
          </ItemContent>
        </Item>
      )}

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

      {/* Cost Price */}
      {data.costPrice !== null && data.costPrice !== undefined && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Box className="size-4" />
              Cost Price
            </ItemTitle>
            <ItemDescription className="text-foreground font-medium">
              ${data.costPrice.toFixed(2)}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Description */}
      {data.description && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <FileText className="size-4" />
              Description
            </ItemTitle>
            <ItemDescription className="text-foreground text-sm">
              <div
                dangerouslySetInnerHTML={{ __html: data.description }}
                className="prose prose-sm dark:prose-invert max-w-none"
              />
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
              Dimensions
            </ItemTitle>
          </ItemContent>
        </Item>

        {/* Length */}
        {data.length !== null && data.length !== undefined && (
          <Item variant="outline">
            <ItemContent className="gap-1">
              <ItemTitle className="flex items-center gap-2">
                <Box className="size-4" />
                Length
              </ItemTitle>
              <ItemDescription className="text-foreground font-medium">
                {data.length} cm
              </ItemDescription>
            </ItemContent>
          </Item>
        )}

        {/* Width */}
        {data.width !== null && data.width !== undefined && (
          <Item variant="outline">
            <ItemContent className="gap-1">
              <ItemTitle className="flex items-center gap-2">
                <Box className="size-4" />
                Width
              </ItemTitle>
              <ItemDescription className="text-foreground font-medium">
                {data.width} cm
              </ItemDescription>
            </ItemContent>
          </Item>
        )}

        {/* Height */}
        {data.height !== null && data.height !== undefined && (
          <Item variant="outline">
            <ItemContent className="gap-1">
              <ItemTitle className="flex items-center gap-2">
                <Box className="size-4" />
                Height
              </ItemTitle>
              <ItemDescription className="text-foreground font-medium">
                {data.height} cm
              </ItemDescription>
            </ItemContent>
          </Item>
        )}

        {/* Weight */}
        {data.weight !== null && data.weight !== undefined && (
          <Item variant="outline">
            <ItemContent className="gap-1">
              <ItemTitle className="flex items-center gap-2">
                <Box className="size-4" />
                Weight
              </ItemTitle>
              <ItemDescription className="text-foreground font-medium">
                {data.weight} kg
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
                Product Images ({data.images.length})
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
                  alt="Product"
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

export default ProductRecord;
