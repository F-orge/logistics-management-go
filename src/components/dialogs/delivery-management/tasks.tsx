import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import {
  AlertCircle,
  Calendar,
  FileText,
  MapPin,
  Package,
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
import { DeliveryManagementTasksResponse } from "@/lib/pb.types";

const statusColors: Record<string, string> = {
  pending: "text-gray-600",
  assigned: "text-blue-600",
  "out-for-delivery": "text-cyan-600",
  delivered: "text-green-600",
  failed: "text-red-600",
  cancelled: "text-gray-500",
  rescheduled: "text-yellow-600",
};

const statusIcons: Record<string, React.ReactNode> = {
  pending: <AlertCircle className="size-4" />,
  assigned: <Package className="size-4" />,
  "out-for-delivery": <MapPin className="size-4" />,
  delivered: <AlertCircle className="size-4" />,
  failed: <AlertCircle className="size-4" />,
  cancelled: <AlertCircle className="size-4" />,
  rescheduled: <Calendar className="size-4" />,
};

const failureReasonColors: Record<string, string> = {
  "reecipient-not-home": "text-orange-600",
  "address-not-found": "text-red-600",
  "refused-delivery": "text-purple-600",
  "damaged-package": "text-red-600",
  "access-denied": "text-red-600",
  "weather-conditions": "text-blue-600",
  "vehicle-breakdown": "text-red-600",
  other: "text-gray-600",
};

const TaskRecord = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["task", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      return pocketbase
        .collection("delivery_management_tasks")
        .getOne<DeliveryManagementTasksResponse>(searchQuery.id);
    },
  });

  if (!data) {
    return <ItemGroup>No task data available</ItemGroup>;
  }

  return (
    <ItemGroup className="gap-3">
      {/* Recipient Name */}
      {data.recipientName && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <User className="size-4" />
              Recipient Name
            </ItemTitle>
            <ItemDescription className="text-foreground font-medium">
              {data.recipientName}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Delivery Address */}
      {data.deliveryAddress && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <MapPin className="size-4" />
              Delivery Address
            </ItemTitle>
            <ItemDescription className="text-foreground">
              {data.deliveryAddress}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Recipient Phone */}
      {data.recipientPhone && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Phone className="size-4" />
              Recipient Phone
            </ItemTitle>
            <ItemDescription className="text-foreground">
              <a
                href={`tel:${data.recipientPhone}`}
                className="text-primary hover:underline"
              >
                {data.recipientPhone}
              </a>
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

      {/* Attempt Count */}
      {data.attempCount !== null && data.attempCount !== undefined && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <AlertCircle className="size-4" />
              Attempt Count
            </ItemTitle>
            <ItemDescription className="text-foreground font-medium">
              {data.attempCount}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Estimated Arrival Time */}
      {data.estimatedArrivalTime && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Calendar className="size-4" />
              Estimated Arrival
            </ItemTitle>
            <ItemDescription className="text-foreground">
              {new Date(data.estimatedArrivalTime).toLocaleDateString("en-US", {
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

      {/* Actual Arrival Time */}
      {data.actualArrivalTime && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Calendar className="size-4" />
              Actual Arrival
            </ItemTitle>
            <ItemDescription className="text-foreground">
              {new Date(data.actualArrivalTime).toLocaleDateString("en-US", {
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

      {/* Delivery Time */}
      {data.deliveryTime && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Calendar className="size-4" />
              Delivery Time
            </ItemTitle>
            <ItemDescription className="text-foreground">
              {new Date(data.deliveryTime).toLocaleDateString("en-US", {
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

      {/* Failure Reason */}
      {data.failureReason && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <AlertCircle className="size-4" />
              Failure Reason
            </ItemTitle>
            <ItemDescription
              className={`font-medium capitalize ${failureReasonColors[data.failureReason] || "text-gray-600"}`}
            >
              {data.failureReason.replace(/-/g, " ")}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Delivery Instructions */}
      {data.deliveryInstructions && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <FileText className="size-4" />
              Delivery Instructions
            </ItemTitle>
            <ItemDescription className="text-foreground text-sm">
              <div
                dangerouslySetInnerHTML={{ __html: data.deliveryInstructions }}
                className="prose prose-sm dark:prose-invert max-w-none"
              />
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Attachments */}
      {data.attachments && data.attachments.length > 0 && (
        <Item variant="outline">
          <ItemContent className="gap-2">
            <ItemTitle className="flex items-center gap-2">
              <FileText className="size-4" />
              Attachments
            </ItemTitle>
            <div className="space-y-1.5">
              {data.attachments.map((attachment) => (
                <a
                  key={attachment}
                  href={pocketbase.files.getURL(data, attachment)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-xs block truncate"
                >
                  {attachment}
                </a>
              ))}
            </div>
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

export default TaskRecord;
