import { useRouteContext } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import {
  Copy,
  Download,
  EditIcon,
  FileText,
  QrCode,
  Trash,
  View,
} from "lucide-react";
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
  coordinatesCell,
  formatDateTime,
  signatureCell,
} from "@/components/utils";
import {
  DeliveryManagementProofOfDeliveriesResponse,
  DeliveryManagementTasksResponse,
} from "@/lib/pb.types";

type ProofOfDeliveryResponse = DeliveryManagementProofOfDeliveriesResponse<{
  task?: DeliveryManagementTasksResponse;
}>;

export const options: RecordListOptions = { expand: "task" };

export const actions: ContextMenuItem<ProofOfDeliveryResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Proof of Delivery ID copied to clipboard");
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
    label: "Edit Proof of Delivery",
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
    label: "Delete Proof of Delivery",
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

export const columns: ColumnDef<ProofOfDeliveryResponse>[] = [
  {
    accessorKey: "recipientName",
    header: "Recipient",
    cell: ({ row }) => {
      const recipientName = row.getValue("recipientName") as string | undefined;
      const task = row.original.expand?.task as
        | DeliveryManagementTasksResponse
        | undefined;
      const address = task?.deliveryAddress;
      return (
        <Item size="sm" className="p-0">
          <ItemContent className="gap-0.5">
            <ItemTitle>{recipientName || address || "-"}</ItemTitle>
            {address && recipientName && (
              <ItemDescription>{address}</ItemDescription>
            )}
          </ItemContent>
        </Item>
      );
    },
  },
  {
    accessorKey: "coordinates",
    header: "Delivery Location",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {coordinatesCell(
              row.getValue("coordinates") as
                | { lon: number; lat: number }
                | undefined
            )}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "timestamp",
    header: "Delivery Time",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {formatDateTime(row.getValue("timestamp") as string)}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "signatureData",
    header: "Signature",
    cell: ({ row }) => {
      const { pocketbase } = useRouteContext({
        from: "/dashboard/$schema/$collection",
      });
      const signatureFile = row.getValue("signatureData") as string | undefined;

      if (!signatureFile) {
        return (
          <Item size="sm" className="p-0">
            <ItemContent className="gap-0.5">
              <ItemTitle>-</ItemTitle>
            </ItemContent>
          </Item>
        );
      }

      const signatureUrl = pocketbase.files.getUrl(row.original, signatureFile);

      return (
        <a href={signatureUrl} target="_blank" rel="noopener noreferrer">
          <Item size="sm" className="p-0 hover:bg-accent">
            <ItemContent className="gap-0.5">
              <ItemTitle className="flex items-center gap-2">
                <FileText className="size-4" />
                Signature
              </ItemTitle>
            </ItemContent>
          </Item>
        </a>
      );
    },
  },
];
