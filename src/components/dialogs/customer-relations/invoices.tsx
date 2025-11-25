import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";
import {
  Calendar,
  CreditCard,
  DollarSign,
  FileText,
  Landmark,
} from "lucide-react";
import React from "react";
import { Dialog } from "@/components/ui/dialog";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import {
  CustomerRelationsInvoiceItemsResponse,
  CustomerRelationsInvoicesResponse,
  CustomerRelationsProductsResponse,
} from "@/lib/pb.types";

const statusColors: Record<string, string> = {
  draft: "text-gray-600",
  sent: "text-blue-600",
  paid: "text-green-600",
  overdue: "text-red-600",
  cancelled: "text-gray-500",
};

const paymentMethodIcons: Record<string, React.ReactNode> = {
  "credit-card": <CreditCard className="size-4" />,
  "bank-transfer": <Landmark className="size-4" />,
  cash: <DollarSign className="size-4" />,
  check: <FileText className="size-4" />,
  paypal: <DollarSign className="size-4" />,
  stripe: <CreditCard className="size-4" />,
  "wire-transfer": <Landmark className="size-4" />,
  other: <DollarSign className="size-4" />,
  maya: <DollarSign className="size-4" />,
  gcash: <DollarSign className="size-4" />,
};

const InvoiceRecord = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data } = useSuspenseQuery({
    queryKey: ["invoice", searchQuery.id],
    queryFn: async () => {
      if (!searchQuery.id) return null;
      return pocketbase.collection("customer_relations_invoices").getOne<
        CustomerRelationsInvoicesResponse & {
          expand?: {
            opportunity?: any;
            items?: (CustomerRelationsInvoiceItemsResponse & {
              expand?: {
                product?: CustomerRelationsProductsResponse;
              };
            })[];
          };
        }
      >(searchQuery.id, { expand: "opportunity,items.product" });
    },
  });

  if (!data) {
    return <ItemGroup>No invoice data available</ItemGroup>;
  }

  return (
    <ItemGroup className="gap-3">
      {/* Invoice Number */}
      <Item variant="outline">
        <ItemContent className="gap-1">
          <ItemTitle className="flex items-center gap-2">
            <FileText className="size-4" />
            Invoice Number
          </ItemTitle>
          <ItemDescription className="text-foreground font-mono">
            {data.invoiceNumber}
          </ItemDescription>
        </ItemContent>
      </Item>

      {/* Status */}
      {data.status && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <FileText className="size-4" />
              Status
            </ItemTitle>
            <ItemDescription
              className={`font-medium capitalize ${statusColors[data.status] || "text-foreground"}`}
            >
              {data.status}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Total */}
      {data.total !== null && data.total !== undefined && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <DollarSign className="size-4" />
              Total
            </ItemTitle>
            <ItemDescription className="text-foreground font-medium">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(data.total)}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Issue Date */}
      {data.issueDate && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Calendar className="size-4" />
              Issue Date
            </ItemTitle>
            <ItemDescription className="text-foreground">
              {new Date(data.issueDate).toLocaleDateString()}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Due Date */}
      {data.dueDate && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              <Calendar className="size-4" />
              Due Date
            </ItemTitle>
            <ItemDescription className="text-foreground">
              {new Date(data.dueDate).toLocaleDateString()}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Sent At */}
      {data.sentAt && (
        <Item variant="muted" size="sm">
          <ItemContent className="gap-1">
            <ItemDescription className="text-xs text-muted-foreground">
              Sent: {new Date(data.sentAt).toLocaleDateString()}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Paid At */}
      {data.paidAt && (
        <Item variant="muted" size="sm">
          <ItemContent className="gap-1">
            <ItemDescription className="text-xs text-muted-foreground">
              Paid: {new Date(data.paidAt).toLocaleDateString()}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Payment Method */}
      {data.paymentMethod && (
        <Item variant="outline">
          <ItemContent className="gap-1">
            <ItemTitle className="flex items-center gap-2">
              {paymentMethodIcons[data.paymentMethod] || (
                <CreditCard className="size-4" />
              )}
              Payment Method
            </ItemTitle>
            <ItemDescription className="text-foreground capitalize">
              {data.paymentMethod.replace(/-/g, " ")}
            </ItemDescription>
          </ItemContent>
        </Item>
      )}

      {/* Items */}
      {data.expand?.items && data.expand.items.length > 0 && (
        <Item variant="outline">
          <ItemContent className="gap-2">
            <ItemTitle className="flex items-center gap-2">
              <FileText className="size-4" />
              Items ({data.expand.items.length})
            </ItemTitle>
            <div className="space-y-2 w-full">
              {/* Header */}
              <div className="text-xs font-semibold text-muted-foreground border-b pb-1.5 grid grid-cols-12 gap-2">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-right">Qty</div>
                <div className="col-span-3 text-right">Unit Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              {/* Items */}
              {data.expand.items.map((item) => (
                <div
                  key={item.id}
                  className="text-xs border-b pb-1.5 grid grid-cols-12 gap-2 items-start"
                >
                  <div className="col-span-5">
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
                  <div className="col-span-2 text-right text-foreground">
                    {item.quantity}
                  </div>
                  <div className="col-span-3 text-right text-foreground">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(item.price)}
                  </div>
                  <div className="col-span-2 text-right font-medium text-foreground">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
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
            Created: {new Date(data.created).toLocaleDateString()}
          </ItemDescription>
          <ItemDescription className="text-xs text-muted-foreground">
            Updated: {new Date(data.updated).toLocaleDateString()}
          </ItemDescription>
          <ItemDescription className="text-xs text-muted-foreground">
            ID: {data.id}
          </ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  );
};

export default InvoiceRecord;
