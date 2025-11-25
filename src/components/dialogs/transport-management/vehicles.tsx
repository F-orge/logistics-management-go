import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { Badge, Calendar, Truck } from "lucide-react";
import React from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { TransportManagementVehiclesResponse } from "@/lib/pb.types";

const VehicleRecord = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["vehicle", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      return pocketbase
        .collection("transport_management_vehicles")
        .getOne<TransportManagementVehiclesResponse>(searchQuery.id);
    },
  });

  if (!data) {
    return <ItemGroup>No vehicle data available</ItemGroup>;
  }

  const statusColors: Record<string, string> = {
    available: "text-[hsl(var(--chart-3))]",
    "in-maintenance": "text-[hsl(var(--chart-4))]",
    "on-trip": "text-[hsl(var(--chart-2))]",
    "out-of-service": "text-destructive",
  };

  return (
    <ItemGroup className="gap-3">
      {/* Registration Number */}
      {data.registrationNumber && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Truck className="size-4" />
              Registration Number
            </ItemTitle>
            <ItemDescription className="text-foreground font-mono text-lg font-bold">
              {data.registrationNumber}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Status */}
      <Item variant="outline">
        <ItemContent className="gap-1">
          <ItemTitle className="flex items-center gap-2">
            <Badge className="size-4" />
            Status
          </ItemTitle>
          <ItemDescription
            className={`font-medium ${statusColors[data.status] || "text-foreground"}`}
          >
            {data.status
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </ItemDescription>
        </ItemContent>
      </Item>

      {/* Model */}
      {data.model && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Truck className="size-4" />
              Model
            </ItemTitle>
            <ItemDescription className="text-foreground">
              {data.model}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Capacity Section */}
      <ItemGroup className="gap-3 border-t pt-3">
        <Item>
          <ItemContent>
            <ItemTitle className="flex items-center gap-2">
              <Truck className="size-4" />
              Capacity
            </ItemTitle>
          </ItemContent>
        </Item>

        {/* Capacity Volume */}
        {data.capacityVolume && (
          <Item variant="outline">
            <ItemContent className="gap-1">
              <ItemTitle className="text-xs font-medium">Volume</ItemTitle>
              <ItemDescription className="text-foreground">
                {data.capacityVolume.toLocaleString()} m³
              </ItemDescription>
            </ItemContent>
          </Item>
        )}

        {/* Capacity Weight */}
        {data.capacityWeight && (
          <Item variant="outline">
            <ItemContent className="gap-1">
              <ItemTitle className="text-xs font-medium">Weight</ItemTitle>
              <ItemDescription className="text-foreground">
                {data.capacityWeight.toLocaleString()} kg
              </ItemDescription>
            </ItemContent>
          </Item>
        )}
      </ItemGroup>

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

export default VehicleRecord;
