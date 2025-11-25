import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import {
  Activity,
  Calendar,
  Image,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import React from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import {
  Map,
  MapLayers,
  MapLayersControl,
  MapMarker,
  MapPopup,
  MapTileLayer,
  MapZoomControl,
} from "@/components/ui/map";
import { WarehouseManagementWarehousesResponse } from "@/lib/pb.types";

const WarehouseRecord = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["warehouse", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      return pocketbase
        .collection("warehouse_management_warehouses")
        .getOne<WarehouseManagementWarehousesResponse>(searchQuery.id);
    },
  });

  if (!data) {
    return <ItemGroup>No warehouse data available</ItemGroup>;
  }

  return (
    <ItemGroup className="gap-3">
      {/* Name */}
      {data.name && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <MapPin className="size-4" />
              Warehouse Name
            </ItemTitle>
            <ItemDescription className="text-foreground font-medium text-lg">
              {data.name}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Status */}
      <Item variant="outline">
        <ItemContent className="gap-1">
          <ItemTitle className="flex items-center gap-2">
            <Activity className="size-4" />
            Status
          </ItemTitle>
          <ItemDescription
            className={`font-medium ${
              data.isActive ? "text-[hsl(var(--chart-3))]" : "text-destructive"
            }`}
          >
            {data.isActive ? "✓ Active" : "✗ Inactive"}
          </ItemDescription>
        </ItemContent>
      </Item>

      {/* Address Section */}
      <ItemGroup className="gap-3 border-t pt-3">
        <Item>
          <ItemContent>
            <ItemTitle className="flex items-center gap-2">
              <MapPin className="size-4" />
              Location
            </ItemTitle>
          </ItemContent>
        </Item>

        {/* Address */}
        {data.address && (
          <Item variant="outline">
            <ItemContent className="gap-1">
              <ItemTitle className="text-xs font-medium">Address</ItemTitle>
              <ItemDescription className="text-foreground">
                {data.address}
              </ItemDescription>
            </ItemContent>
          </Item>
        )}

        {/* City */}
        {data.city && (
          <Item variant="outline">
            <ItemContent className="gap-1">
              <ItemTitle className="text-xs font-medium">City</ItemTitle>
              <ItemDescription className="text-foreground">
                {data.city}
              </ItemDescription>
            </ItemContent>
          </Item>
        )}

        {/* State */}
        {data.state && (
          <Item variant="outline">
            <ItemContent className="gap-1">
              <ItemTitle className="text-xs font-medium">
                State/Province
              </ItemTitle>
              <ItemDescription className="text-foreground">
                {data.state}
              </ItemDescription>
            </ItemContent>
          </Item>
        )}

        {/* Postal Code */}
        {data.postalCode && (
          <Item variant="outline">
            <ItemContent className="gap-1">
              <ItemTitle className="text-xs font-medium">Postal Code</ItemTitle>
              <ItemDescription className="text-foreground font-mono">
                {data.postalCode}
              </ItemDescription>
            </ItemContent>
          </Item>
        )}

        {/* Country */}
        {data.country && (
          <Item variant="outline">
            <ItemContent className="gap-1">
              <ItemTitle className="text-xs font-medium">Country</ItemTitle>
              <ItemDescription className="text-foreground">
                {data.country}
              </ItemDescription>
            </ItemContent>
          </Item>
        )}

        {/* Timezone */}
        {data.timezone && (
          <Item variant="outline">
            <ItemContent className="gap-1">
              <ItemTitle className="text-xs font-medium">Timezone</ItemTitle>
              <ItemDescription className="text-foreground font-mono">
                {data.timezone}
              </ItemDescription>
            </ItemContent>
          </Item>
        )}
      </ItemGroup>

      {/* Contact Section */}
      <ItemGroup className="gap-3 border-t pt-3">
        <Item>
          <ItemContent>
            <ItemTitle className="flex items-center gap-2">
              <User className="size-4" />
              Contact Information
            </ItemTitle>
          </ItemContent>
        </Item>

        {/* Contact Person */}
        {data.contactPerson && (
          <Item variant="outline">
            <ItemContent className="gap-1">
              <ItemTitle className="flex items-center gap-2">
                <User className="size-4" />
                Contact Person
              </ItemTitle>
              <ItemDescription className="text-foreground font-medium">
                {data.contactPerson}
              </ItemDescription>
            </ItemContent>
          </Item>
        )}

        {/* Contact Email */}
        {data.contactEmail && (
          <Item variant="outline">
            <ItemContent className="gap-1">
              <ItemTitle className="flex items-center gap-2">
                <Mail className="size-4" />
                Email
              </ItemTitle>
              <ItemDescription>
                <a
                  href={`mailto:${data.contactEmail}`}
                  className="text-primary hover:underline"
                >
                  {data.contactEmail}
                </a>
              </ItemDescription>
            </ItemContent>
          </Item>
        )}

        {/* Contact Phone */}
        {data.contactPhone && (
          <Item variant="outline">
            <ItemContent className="gap-1">
              <ItemTitle className="flex items-center gap-2">
                <Phone className="size-4" />
                Phone
              </ItemTitle>
              <ItemDescription>
                <a
                  href={`tel:${data.contactPhone}`}
                  className="text-primary hover:underline"
                >
                  {data.contactPhone}
                </a>
              </ItemDescription>
            </ItemContent>
          </Item>
        )}
      </ItemGroup>

      {/* Map */}
      {data.location && (
        <div className="rounded-lg border border-border overflow-hidden">
          <Map
            zoom={15}
            center={{ lat: data.location.lat, lng: data.location.lon }}
          >
            <MapLayers>
              <MapLayersControl />
            </MapLayers>
            <MapZoomControl />
            <MapMarker
              position={{ lat: data.location.lat, lng: data.location.lon }}
            >
              <MapPopup>{data.name}</MapPopup>
            </MapMarker>
          </Map>
        </div>
      )}

      {/* Images */}
      {data.images && data.images.length > 0 && (
        <ItemGroup className="gap-3 border-t pt-3">
          <Item>
            <ItemContent>
              <ItemTitle className="flex items-center gap-2">
                <Image className="size-4" />
                Warehouse Images ({data.images.length})
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
                  alt="Warehouse"
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

export default WarehouseRecord;
