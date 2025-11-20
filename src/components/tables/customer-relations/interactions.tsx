import { ColumnDef } from "@tanstack/react-table";
import { Copy, EditIcon, QrCode, Trash, View } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { toast } from "sonner";
import { ContextMenuItem } from "@/components/ui/data-table";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  formatDate,
  interactionTypeCell,
  truncateText,
} from "@/components/utils";
import {
  CustomerRelationsCasesResponse,
  CustomerRelationsContactsResponse,
  CustomerRelationsInteractionsResponse,
  UsersRecord,
} from "@/lib/pb.types";

type InteractionResponse = CustomerRelationsInteractionsResponse<{
  contact?: CustomerRelationsContactsResponse;
  user?: UsersRecord;
  case?: CustomerRelationsCasesResponse;
}>;

export const options: RecordListOptions = { expand: "contact,user,case" };

export const actions: ContextMenuItem<InteractionResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Interaction ID copied to clipboard");
    },
  },
  {
    label: "Share Via QR Code",
    icon: <QrCode />,
    onSelect: (row, navigate) =>
      navigate({
        search: (prev) => ({ ...prev, action: "share", id: row.original.id }),
      }),
    divider: true,
  },
  {
    label: "View Record",
    icon: <View />,
    onSelect: (row, navigate) =>
      navigate({
        search: (prev) => ({ ...prev, action: "view", id: row.original.id }),
      }),
  },
];

export const columns: ColumnDef<InteractionResponse>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {interactionTypeCell(row.getValue("type") as string | undefined)}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "interactionDate",
    header: "Date",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {formatDate(row.getValue("interactionDate") as string)}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "outcome",
    header: "Outcome",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>{row.getValue("outcome") || "-"}</ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {truncateText(row.getValue("notes") as string | undefined)}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => {
      const contact = row.original.expand?.contact as
        | CustomerRelationsContactsResponse
        | undefined;
      if (!contact) return "-";
      return (
        <a
          href={`/dashboard/customer-relations/contacts?action=view&id=${contact.id}`}
          className="hover:underline"
        >
          <Item size="sm" className="p-0">
            <ItemContent className="gap-0.5">
              <ItemTitle>{contact.name}</ItemTitle>
              {contact.email && (
                <ItemDescription>{contact.email}</ItemDescription>
              )}
            </ItemContent>
          </Item>
        </a>
      );
    },
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.original.expand?.user as UsersRecord | undefined;
      if (!user) return "-";
      return (
        <Item size="sm" className="p-0">
          <ItemContent className="gap-0.5">
            <ItemTitle>{user.name || user.email}</ItemTitle>
          </ItemContent>
        </Item>
      );
    },
  },
  {
    accessorKey: "case",
    header: "Case",
    cell: ({ row }) => {
      const caseData = row.original.expand?.case as
        | CustomerRelationsCasesResponse
        | undefined;
      if (!caseData) return "-";
      return (
        <a
          href={`/dashboard/customer-relations/cases?action=view&id=${caseData.id}`}
          className="hover:underline"
        >
          <Item size="sm" className="p-0">
            <ItemContent className="gap-0.5">
              <ItemTitle>{caseData.caseNumber}</ItemTitle>
            </ItemContent>
          </Item>
        </a>
      );
    },
  },
];
