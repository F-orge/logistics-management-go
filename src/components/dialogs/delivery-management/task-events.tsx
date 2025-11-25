import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import {
  AlertCircle,
  Calendar,
  FileText,
  MapPin,
  MessageSquare,
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
import {
  DeliveryManagementTaskEventsResponse,
  DeliveryManagementTasksResponse,
} from "@/lib/pb.types";

const statusColors: Record<string, string> = {
  assigned: "text-blue-600",
  started: "text-cyan-600",
  arrived: "text-purple-600",
  delivered: "text-green-600",
  failed: "text-red-600",
  exception: "text-orange-600",
  cancelled: "text-gray-600",
  rescheduled: "text-yellow-600",
};

const statusIcons: Record<string, React.ReactNode> = {
  assigned: <AlertCircle className="size-4" />,
  started: <AlertCircle className="size-4" />,
  arrived: <MapPin className="size-4" />,
  delivered: <AlertCircle className="size-4" />,
  failed: <AlertCircle className="size-4" />,
  exception: <AlertCircle className="size-4" />,
  cancelled: <AlertCircle className="size-4" />,
  rescheduled: <Calendar className="size-4" />,
};

const TaskEventRecord = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["task-event", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      return pocketbase.collection("delivery_management_task_events").getOne<
        DeliveryManagementTaskEventsResponse & {
          expand?: {
            task?: DeliveryManagementTasksResponse;
          };
        }
      >(searchQuery.id, { expand: "task" });
    },
  });

  if (!data) {
    return <ItemGroup>No task event data available</ItemGroup>;
  }

  return (
    <ItemGroup className="gap-3">
      {/* Task */}
      {data.expand?.task && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <AlertCircle className="size-4" />
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

      {/* Status */}
      {data.status && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              {statusIcons[data.status]}
              Status
            </ItemTitle>
            <ItemDescription
              className={`font-medium capitalize ${statusColors[data.status]}`}
            >
              {data.status.replace(/-/g, " ")}
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
              Event Location
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
                        <p className="font-semibold capitalize">
                          {data.status}
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

      {/* Reason */}
      {data.reason && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <FileText className="size-4" />
              Reason
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

      {/* Notes */}
      {data.notes && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <MessageSquare className="size-4" />
              Notes
            </ItemTitle>
            <ItemDescription className="text-foreground text-sm">
              <div
                dangerouslySetInnerHTML={{ __html: data.notes }}
                className="prose prose-sm dark:prose-invert max-w-none"
              />
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

export default TaskEventRecord;
