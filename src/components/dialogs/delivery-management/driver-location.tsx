import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { Calendar, MapPin, User } from "lucide-react";
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
import {
  DeliveryManagementDriverLocationResponse,
  TransportManagementDriversResponse,
  UsersRecord,
} from "@/lib/pb.types";

const DriverLocationRecord = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["driver-location", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      return pocketbase
        .collection("delivery_management_driver_location")
        .getOne<
          DeliveryManagementDriverLocationResponse & {
            expand?: {
              driver?: TransportManagementDriversResponse & {
                expand?: {
                  user?: UsersRecord;
                };
              };
            };
          }
        >(searchQuery.id, { expand: "driver.user" });
    },
  });

  if (!data) {
    return <ItemGroup>No driver location data available</ItemGroup>;
  }

  return (
    <ItemGroup className="gap-3">
      {/* Driver */}
      {data.expand?.driver && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <User className="size-4" />
              Driver
            </ItemTitle>
            <ItemDescription className="text-foreground font-medium">
              {data.expand.driver.expand?.user?.name || "Driver"}
            </ItemDescription>
            {data.expand.driver.licenseNumber && (
              <ItemDescription className="text-muted-foreground text-xs">
                License: {data.expand.driver.licenseNumber}
              </ItemDescription>
            )}
          </ItemContent>
        </Item>
      )}

      {/* Coordinates */}
      {data.coordinates && (
        <Item variant="outline">
          <ItemContent className="gap-2">
            <ItemTitle className="flex items-center gap-2">
              <MapPin className="size-4" />
              Current Location
            </ItemTitle>
            <div className="w-full h-80 rounded-md overflow-hidden border">
              <MapLayers>
                <Map
                  center={[data.coordinates.lat, data.coordinates.lon]}
                  zoom={15}
                >
                  <MapTileLayer
                    name="OpenStreetMap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <MapMarker
                    position={{
                      lat: data.coordinates.lat,
                      lng: data.coordinates.lon,
                    }}
                  >
                    <MapPopup>
                      <div className="space-y-1">
                        <p className="font-semibold">
                          {data.expand?.driver?.expand?.user?.name ||
                            "Driver Location"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {data.coordinates.lat}, {data.coordinates.lon}
                        </p>
                      </div>
                    </MapPopup>
                  </MapMarker>
                  <MapZoomControl />
                  <MapLayersControl />
                </Map>
              </MapLayers>
            </div>
            <ItemDescription className="text-foreground font-mono text-xs">
              {data.coordinates.lat}, {data.coordinates.lon}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Timestamp */}
      {data.timestamp && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Calendar className="size-4" />
              Last Updated
            </ItemTitle>
            <ItemDescription className="text-muted-foreground text-xs">
              {new Date(data.timestamp).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}
    </ItemGroup>
  );
};

export default DriverLocationRecord;
