import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import { Calendar, FileText, Image } from "lucide-react";
import React from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { TransportManagementCarriersResponse } from "@/lib/pb.types";

const CarrierRecord = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["carrier", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      return pocketbase
        .collection("transport_management_carriers")
        .getOne<TransportManagementCarriersResponse>(searchQuery.id);
    },
  });

  if (!data) {
    return <ItemGroup>No carrier data available</ItemGroup>;
  }

  return (
    <ItemGroup className="gap-3">
      {/* Name */}
      {data.name && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="text-lg font-bold">{data.name}</ItemTitle>
          </ItemContent>
        </Item>
      )}

      {/* Contact Details */}
      {data.contactDetails && (
        <ItemGroup className="gap-3 border-t pt-3">
          <Item>
            <ItemContent>
              <ItemTitle className="flex items-center gap-2">
                <FileText className="size-4" />
                Contact Details
              </ItemTitle>
            </ItemContent>
          </Item>
          <Item variant="outline">
            <ItemContent className="gap-1">
              <div
                className="prose prose-sm max-w-none dark:prose-invert text-foreground"
                dangerouslySetInnerHTML={{ __html: data.contactDetails }}
              />
            </ItemContent>
          </Item>
        </ItemGroup>
      )}

      {/* Service Offered */}
      {data.serviceOffered && (
        <ItemGroup className="gap-3 border-t pt-3">
          <Item>
            <ItemContent>
              <ItemTitle className="flex items-center gap-2">
                <FileText className="size-4" />
                Services Offered
              </ItemTitle>
            </ItemContent>
          </Item>
          <Item variant="outline">
            <ItemContent className="gap-1">
              <div
                className="prose prose-sm max-w-none dark:prose-invert text-foreground"
                dangerouslySetInnerHTML={{ __html: data.serviceOffered }}
              />
            </ItemContent>
          </Item>
        </ItemGroup>
      )}

      {/* Image */}
      {data.image && (
        <ItemGroup className="gap-3 border-t pt-3">
          <Item>
            <ItemContent>
              <ItemTitle className="flex items-center gap-2">
                <Image className="size-4" />
                Logo/Image
              </ItemTitle>
            </ItemContent>
          </Item>
          <div className="rounded-lg border border-border overflow-hidden">
            <img
              src={pocketbase.getFileUrl(data, data.image)}
              alt={data.name}
              className="w-full h-32 object-cover"
            />
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

export default CarrierRecord;
