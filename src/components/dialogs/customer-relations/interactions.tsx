import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import {
  Calendar,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  User,
  Video,
} from "lucide-react";
import React from "react";
import { Dialog } from "@/components/ui/dialog";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  CustomerRelationsInteractionsResponse,
  UsersRecord,
} from "@/lib/pb.types";

const typeIcons: Record<string, React.ReactNode> = {
  call: <Phone className="size-4" />,
  meeting: <Video className="size-4" />,
  text: <MessageSquare className="size-4" />,
  email: <Mail className="size-4" />,
};

const InteractionRecord = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["interaction", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      return pocketbase.collection("customer_relations_interactions").getOne<
        CustomerRelationsInteractionsResponse & {
          expand?: {
            user?: UsersRecord;
            contact?: any;
            case?: any;
          };
        }
      >(searchQuery.id, { expand: "user,contact,case" });
    },
  });

  if (!data) {
    return <ItemGroup>No interaction data available</ItemGroup>;
  }

  return (
    <ItemGroup className="gap-3">
      {/* Interaction Type */}
      {data.type && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              {typeIcons[data.type] || <MessageSquare className="size-4" />}
              Type
            </ItemTitle>
            <ItemDescription className="text-foreground font-medium capitalize">
              {data.type}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Interaction Date */}
      <Item variant="outline">
        <ItemContent className="gap-1">
          <ItemTitle className="flex items-center gap-2">
            <Calendar className="size-4" />
            Date
          </ItemTitle>
          <ItemDescription className="text-foreground">
            {new Date(data.interactionDate).toLocaleDateString()}
          </ItemDescription>
        </ItemContent>
      </Item>

      {/* Outcome */}
      {data.outcome && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <FileText className="size-4" />
              Outcome
            </ItemTitle>
            <ItemDescription className="text-foreground">
              {data.outcome}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Notes */}
      {data.notes && (
        <Item variant="outline">
          <ItemContent className="gap-2">
            <ItemTitle className="flex items-center gap-2">
              <FileText className="size-4" />
              Notes
            </ItemTitle>
            <div
              className="text-sm text-muted-foreground prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: data.notes }}
            />
          </ItemContent>
        </Item>
      )}

      {/* Contact - Relation */}
      {data.expand?.contact && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <User className="size-4" />
              Contact
            </ItemTitle>
            <ItemDescription className="text-foreground font-medium">
              {data.expand.contact.name}
            </ItemDescription>
            {data.expand.contact.email && (
              <ItemDescription className="text-muted-foreground text-xs">
                {data.expand.contact.email}
              </ItemDescription>
            )}
          </ItemContent>
        </Item>
      )}

      {/* User - Relation */}
      {data.expand?.user && (
        <Item variant="outline">
          {data.expand.user.avatar && (
            <ItemMedia>
              <img
                src={pocketbase.files.getURL(
                  data.expand.user,
                  data.expand.user.avatar
                )}
                alt={data.expand.user.name || "User"}
                className="size-10 rounded-full object-cover"
              />
            </ItemMedia>
          )}
          <ItemContent className="gap-2">
            <ItemTitle className="flex items-center gap-2">
              <User className="size-4" />
              User
            </ItemTitle>
            <div className="text-sm space-y-1">
              {data.expand.user.name && (
                <ItemDescription className="text-foreground font-medium">
                  {data.expand.user.name}
                </ItemDescription>
              )}
              {data.expand.user.email && (
                <ItemDescription className="text-muted-foreground">
                  {data.expand.user.email}
                </ItemDescription>
              )}
              {data.expand.user.roles && data.expand.user.roles.length > 0 && (
                <ItemDescription className="text-xs text-muted-foreground">
                  {data.expand.user.roles.join(", ")}
                </ItemDescription>
              )}
            </div>
          </ItemContent>
        </Item>
      )}

      {/* Case - Relation */}
      {data.expand?.case && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <FileText className="size-4" />
              Related Case
            </ItemTitle>
            <ItemDescription className="text-foreground font-medium">
              {data.expand.case.caseNumber}
            </ItemDescription>
            {data.expand.case.status && (
              <ItemDescription className="text-muted-foreground text-xs capitalize">
                {data.expand.case.status.replace(/-/g, " ")}
              </ItemDescription>
            )}
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
                  className="block text-sm truncate text-primary hover:underline"
                >
                  {attachment}
                </a>
              ))}
            </div>
          </ItemContent>
        </Item>
      )}

      {/* Metadata */}
      <Item variant="muted" size="sm">
        <ItemContent className="gap-1">
          <ItemDescription className="text-xs text-muted-foreground">
            ID: {data.id}
          </ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  );
};

export default InteractionRecord;
