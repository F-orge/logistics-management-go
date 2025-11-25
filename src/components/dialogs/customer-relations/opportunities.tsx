import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import {
  AlertCircle,
  Award,
  Calendar,
  DollarSign,
  FileText,
  Package,
  TrendingUp,
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
  CustomerRelationsCampaignsResponse,
  CustomerRelationsCompaniesResponse,
  CustomerRelationsContactsResponse,
  CustomerRelationsOpportunitiesResponse,
  CustomerRelationsOpportunityProductsResponse,
  CustomerRelationsProductsResponse,
  UsersRecord,
} from "@/lib/pb.types";

const stageColors: Record<string, string> = {
  prospecting: "text-blue-600",
  qualification: "text-cyan-600",
  "need-analysis": "text-purple-600",
  demo: "text-indigo-600",
  proposal: "text-yellow-600",
  negotiation: "text-orange-600",
  "closed-won": "text-green-600",
  "closed-lost": "text-red-600",
};

const stageIcons: Record<string, React.ReactNode> = {
  prospecting: <AlertCircle className="size-4" />,
  qualification: <User className="size-4" />,
  "need-analysis": <FileText className="size-4" />,
  demo: <Package className="size-4" />,
  proposal: <FileText className="size-4" />,
  negotiation: <TrendingUp className="size-4" />,
  "closed-won": <Award className="size-4" />,
  "closed-lost": <AlertCircle className="size-4" />,
};

const sourceColors: Record<string, string> = {
  website: "text-blue-600",
  referral: "text-purple-600",
  "social-media": "text-pink-600",
  "email-campaign": "text-orange-600",
  "cold-call": "text-red-600",
  event: "text-green-600",
  advertisment: "text-indigo-600",
  partner: "text-cyan-600",
  "existing-customer": "text-teal-600",
  other: "text-gray-600",
};

const OpportunityRecord = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["opportunity", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      return pocketbase.collection("customer_relations_opportunities").getOne<
        CustomerRelationsOpportunitiesResponse & {
          expand?: {
            owner?: UsersRecord;
            contact?: CustomerRelationsContactsResponse;
            company?: CustomerRelationsCompaniesResponse;
            campaign?: CustomerRelationsCampaignsResponse;
            products?: (CustomerRelationsOpportunityProductsResponse & {
              expand?: {
                product?: CustomerRelationsProductsResponse;
              };
            })[];
          };
        }
      >(searchQuery.id, {
        expand: "owner,contact,company,campaign,products.product",
      });
    },
  });

  if (!data) {
    return <ItemGroup>No opportunity data available</ItemGroup>;
  }

  return (
    <ItemGroup className="gap-3">
      {/* Name */}
      <Item variant="outline">
        <ItemContent className="gap-1">
          <ItemTitle className="flex items-center gap-2">
            <TrendingUp className="size-4" />
            Opportunity Name
          </ItemTitle>
          <ItemDescription className="text-foreground font-medium">
            {data.name}
          </ItemDescription>
        </ItemContent>
      </Item>

      {/* Stage */}
      {data.stage && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              {stageIcons[data.stage]}
              Stage
            </ItemTitle>
            <ItemDescription
              className={`font-medium capitalize ${stageColors[data.stage]}`}
            >
              {data.stage.replace(/-/g, " ")}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Deal Value */}
      {data.dealValue !== null && data.dealValue !== undefined && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <DollarSign className="size-4" />
              Deal Value
            </ItemTitle>
            <ItemDescription className="text-foreground font-medium">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(data.dealValue)}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Probability */}
      {data.probability !== null && data.probability !== undefined && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Award className="size-4" />
              Probability
            </ItemTitle>
            <ItemDescription className="text-foreground">
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${Math.min(data.probability, 100)}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{data.probability}%</span>
              </div>
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Expected Close Date */}
      {data.expectedCloseDate && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Calendar className="size-4" />
              Expected Close Date
            </ItemTitle>
            <ItemDescription className="text-foreground">
              {new Date(data.expectedCloseDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Source */}
      {data.source && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <AlertCircle className="size-4" />
              Source
            </ItemTitle>
            <ItemDescription
              className={`font-medium capitalize ${sourceColors[data.source] || "text-gray-600"}`}
            >
              {data.source.replace(/-/g, " ")}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Owner */}
      {data.expand?.owner && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <User className="size-4" />
              Owner
            </ItemTitle>
            <div className="flex items-center gap-2 mt-1">
              {data.expand.owner.avatar && (
                <img
                  src={pocketbase.files.getURL(
                    data.expand.owner,
                    data.expand.owner.avatar
                  )}
                  alt={data.expand.owner.name}
                  className="w-6 h-6 rounded-full"
                />
              )}
              <div className="flex-1 min-w-0">
                <ItemDescription className="text-foreground font-medium">
                  {data.expand.owner.name}
                </ItemDescription>
                <ItemDescription className="text-muted-foreground text-xs">
                  {data.expand.owner.email}
                </ItemDescription>
              </div>
            </div>
          </ItemContent>
        </Item>
      )}

      {/* Contact */}
      {data.expand?.contact && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <User className="size-4" />
              Contact
            </ItemTitle>
            <ItemDescription className="text-foreground">
              <button
                onClick={() => {
                  window.location.href = `/dashboard/customer-relations/contacts?action=view&id=${data.expand?.contact?.id}`;
                }}
                className="text-primary hover:underline"
              >
                {data.expand?.contact?.name}
              </button>
              {data.expand?.contact?.email && (
                <div className="text-muted-foreground text-xs">
                  {data.expand?.contact?.email}
                </div>
              )}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Company */}
      {data.expand?.company && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <AlertCircle className="size-4" />
              Company
            </ItemTitle>
            <ItemDescription className="text-foreground">
              <button
                onClick={() => {
                  window.location.href = `/dashboard/customer-relations/companies?action=view&id=${data.expand?.company?.id}`;
                }}
                className="text-primary hover:underline"
              >
                {data.expand?.company?.name}
              </button>
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Campaign */}
      {data.expand?.campaign && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Award className="size-4" />
              Campaign
            </ItemTitle>
            <ItemDescription className="text-foreground">
              <button
                onClick={() => {
                  window.location.href = `/dashboard/customer-relations/campaigns?action=view&id=${data.expand?.campaign?.id}`;
                }}
                className="text-primary hover:underline"
              >
                {data.expand?.campaign?.name}
              </button>
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Products */}
      {data.expand?.products && data.expand.products.length > 0 && (
        <Item variant="outline">
          <ItemContent className="gap-2">
            <ItemTitle className="flex items-center gap-2">
              <Package className="size-4" />
              Products ({data.expand.products.length})
            </ItemTitle>
            <div className="space-y-2 w-full">
              {/* Header */}
              <div className="text-xs font-semibold text-muted-foreground border-b pb-1.5 grid grid-cols-12 gap-2">
                <div className="col-span-7">Product</div>
                <div className="col-span-3 text-right">Quantity</div>
                <div className="col-span-2 text-right">Unit Price</div>
              </div>
              {/* Products */}
              {data.expand.products.map((item) => (
                <div
                  key={item.id}
                  className="text-xs border-b pb-1.5 grid grid-cols-12 gap-2 items-start"
                >
                  <div className="col-span-7">
                    <div className="font-medium text-foreground">
                      {item.expand?.product?.name}
                    </div>
                    <div className="text-muted-foreground">
                      {item.expand?.product?.sku}
                    </div>
                    {item.expand?.product?.type && (
                      <div className="text-muted-foreground capitalize">
                        ({item.expand.product.type})
                      </div>
                    )}
                  </div>
                  <div className="col-span-3 text-right text-foreground font-medium">
                    {item.quantity} unit{item.quantity !== 1 ? "s" : ""}
                  </div>
                  <div className="col-span-2 text-right text-foreground">
                    {item.expand?.product?.price && (
                      <div>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(item.expand.product.price)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ItemContent>
        </Item>
      )}

      {/* Lost Reason */}
      {data.lostReason && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <AlertCircle className="size-4" />
              Lost Reason
            </ItemTitle>
            <ItemDescription className="text-foreground text-sm">
              <div
                dangerouslySetInnerHTML={{ __html: data.lostReason }}
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

export default OpportunityRecord;
