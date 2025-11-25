import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { Calendar, FileText, MapPin, User } from "lucide-react";
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
  DeliveryManagementProofOfDeliveriesResponse,
  DeliveryManagementTasksResponse,
} from "@/lib/pb.types";

const ProofOfDeliveryRecord = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["proof-of-delivery", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      return pocketbase
        .collection("delivery_management_proof_of_deliveries")
        .getOne<
          DeliveryManagementProofOfDeliveriesResponse & {
            expand?: {
              task?: DeliveryManagementTasksResponse;
            };
          }
        >(searchQuery.id, { expand: "task" });
    },
  });

  if (!data) {
    return <ItemGroup>No proof of delivery data available</ItemGroup>;
  }

  return (
    <ItemGroup className="gap-3">
      {/* Task */}
      {data.expand?.task && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <FileText className="size-4" />
              Task
            </ItemTitle>
            <ItemDescription className="text-foreground">
              <button
                onClick={() => {
                  window.location.href = `/dashboard/delivery-management/tasks?action=view&id=${data.expand?.task?.id}`;
                }}
                className="text-primary hover:underline"
              >
                {data.expand?.task?.recipientName}
              </button>
              {data.expand?.task?.deliveryAddress && (
                <div className="text-muted-foreground text-xs">
                  {data.expand?.task?.deliveryAddress}
                </div>
              )}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Recipient Name */}
      {data.recipientName && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <User className="size-4" />
              Recipient Name
            </ItemTitle>
            <ItemDescription className="text-foreground">
              {data.recipientName}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Coordinates */}
      {data.coordinates && (
        <Item variant="outline">
          <ItemContent className="gap-2">
            <ItemTitle className="flex items-center gap-2">
              <MapPin className="size-4" />
              Delivery Location
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
                        <p className="font-semibold">{data.recipientName}</p>
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

      {/* Signature */}
      {data.signatureData && (
        <Item variant="outline">
          <ItemContent className="gap-2">
            <ItemTitle className="flex items-center gap-2">
              <FileText className="size-4" />
              Signature
            </ItemTitle>
            <a
              href={pocketbase.files.getURL(data, data.signatureData)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-xs block truncate"
            >
              {data.signatureData}
            </a>
          </ItemContent>
        </Item>
      )}

      {/* Timestamp */}
      {data.timestamp && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Calendar className="size-4" />
              Timestamp
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

export default ProofOfDeliveryRecord;
