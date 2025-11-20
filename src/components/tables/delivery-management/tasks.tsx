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
  formatDateTime,
  formatHyphens,
  statusBadgeCell,
  taskStatusColors,
  truncateText,
} from "@/components/utils";
import { DeliveryManagementTasksResponse } from "@/lib/pb.types";

type TaskResponse = DeliveryManagementTasksResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<TaskResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Task ID copied to clipboard");
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
  {
    label: "Edit Task",
    icon: <EditIcon />,
    onSelect: (row, navigate) =>
      navigate({
        search: (prev) => ({
          ...prev,
          action: "update",
          id: row.original.id,
        }),
      }),
    divider: true,
  },
  {
    label: "Delete Task",
    variant: "destructive",
    icon: <Trash />,
    onSelect: (row, navigate) =>
      navigate({
        search: (prev) => ({
          ...prev,
          action: "delete",
          id: row.original.id,
        }),
      }),
  },
];

export const columns: ColumnDef<TaskResponse>[] = [
  {
    accessorKey: "deliveryAddress",
    header: "Delivery Address",
    cell: ({ row }) => {
      const recipient = row.getValue("recipientName") as string | undefined;
      const address = row.getValue("deliveryAddress") as string;
      const phone = row.getValue("recipientPhone") as string | undefined;
      return (
        <Item size="sm" className="p-0">
          <ItemContent className="gap-0.5">
            <ItemTitle>{recipient || address}</ItemTitle>
            {phone && <ItemDescription>{phone}</ItemDescription>}
          </ItemContent>
        </Item>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {statusBadgeCell(
              row.getValue("status") as string,
              taskStatusColors
            )}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "estimatedArrivalTime",
    header: "Est. Arrival",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {formatDateTime(
              row.getValue("estimatedArrivalTime") as string | undefined
            )}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "actualArrivalTime",
    header: "Actual Arrival",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {formatDateTime(
              row.getValue("actualArrivalTime") as string | undefined
            )}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "deliveryTime",
    header: "Delivery Time",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {formatDateTime(row.getValue("deliveryTime") as string | undefined)}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "failureReason",
    header: "Failure Reason",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {formatHyphens(row.getValue("failureReason") as string | undefined)}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "attempCount",
    header: "Attempts",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>{row.getValue("attempCount") || "-"}</ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "deliveryInstructions",
    header: "Instructions",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {truncateText(
              row.getValue("deliveryInstructions") as string | undefined,
              40
            )}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
];
