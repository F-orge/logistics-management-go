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
  CustomerRelationsCompaniesResponse,
  WarehouseManagementReturnsResponse,
  WarehouseManagementSalesOrdersResponse,
} from "@/lib/pb.types";

const statusColors: Record<string, string> = {
  requested: "text-[hsl(var(--chart-5))]",
  approved: "text-[hsl(var(--chart-2))]",
  received: "text-[hsl(var(--chart-3))]",
  processed: "text-[hsl(var(--chart-3))]",
  rejected: "text-destructive",
};

const ReturnRecord = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["return", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      return pocketbase.collection("warehouse_management_returns").getOne<
        WarehouseManagementReturnsResponse & {
          expand?: {
            salesOrder?: WarehouseManagementSalesOrdersResponse;
            client?: CustomerRelationsCompaniesResponse;
          };
        }
      >(searchQuery.id, { expand: "salesOrder,client" });
    },
  });

  if (!data) {
    return <ItemGroup>No return data available</ItemGroup>;
  }

  return (
    <ItemGroup className="gap-3">
      {/* Return Number */}
      {data.returnNumber && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Package className="size-4" />
              Return Number
            </ItemTitle>
            <ItemDescription className="text-foreground font-mono text-lg font-semibold">
              {data.returnNumber}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

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

      {/* Reason */}
      {data.reason && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <FileText className="size-4" />
              Reason for Return
            </ItemTitle>
            <ItemDescription className="text-foreground text-sm">
              <div
                dangerouslySetInnerHTML={{ __html: data.reason }}
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

export default ReturnRecord;
