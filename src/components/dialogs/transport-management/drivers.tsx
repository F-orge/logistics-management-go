import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { Badge, Calendar, User } from "lucide-react";
import React from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { TransportManagementDriversResponse } from "@/lib/pb.types";

const DriverRecord = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["driver", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      return pocketbase.collection("transport_management_drivers").getOne<
        TransportManagementDriversResponse & {
          expand?: {
            user?: { email: string; name: string };
          };
        }
      >(searchQuery.id, { expand: "user" });
    },
  });

  if (!data) {
    return <ItemGroup>No driver data available</ItemGroup>;
  }

  const statusColors: Record<string, string> = {
    active: "text-[hsl(var(--chart-3))]",
    inactive: "text-destructive",
    "on-leave": "text-[hsl(var(--chart-5))]",
  };

  return (
    <ItemGroup className="gap-3">
      {/* User */}
      {data.expand?.user && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <User className="size-4" />
              Driver
            </ItemTitle>
            <ItemDescription className="text-foreground font-medium">
              {data.expand.user.name || data.expand.user.email}
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
            {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
          </ItemDescription>
        </ItemContent>
      </Item>

      {/* License Number */}
      {data.licenseNumber && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Badge className="size-4" />
              License Number
            </ItemTitle>
            <ItemDescription className="text-foreground font-mono">
              {data.licenseNumber}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* License Expiry Date */}
      {data.licenseExpiryDate && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Calendar className="size-4" />
              License Expiry
            </ItemTitle>
            <ItemDescription className="text-foreground">
              {new Date(data.licenseExpiryDate).toLocaleDateString("en-US", {
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

export default DriverRecord;
