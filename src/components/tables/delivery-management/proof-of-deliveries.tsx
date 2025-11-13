import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import { RecordListOptions } from "pocketbase";
import { ContextMenuItem } from "@/components/ui/data-table";
import { DeliveryManagementProofOfDeliveriesResponse } from "@/lib/pb.types";
import { formatDateTime, coordinatesCell, signatureCell } from "@/components/utils";

type ProofOfDeliveryResponse = DeliveryManagementProofOfDeliveriesResponse;

export const options: RecordListOptions = {};

export const actions: ContextMenuItem<ProofOfDeliveryResponse>[] = [
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
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "task",
    header: "Task ID",
  },
  {
    accessorKey: "recipientName",
    header: "Recipient Name",
  },
  {
    accessorKey: "coordinates",
    header: "Delivery Location",
    cell: ({ row }) =>
      coordinatesCell(
        row.getValue("coordinates") as { lon: number; lat: number } | undefined
      ),
  },
  {
    accessorKey: "timestamp",
    header: "Delivery Time",
    cell: ({ row }) => formatDateTime(row.getValue("timestamp") as string),
  },
  {
    accessorKey: "signatureData",
    header: "Signature",
    cell: ({ row }) => signatureCell(row.getValue("signatureData")),
  },
];
