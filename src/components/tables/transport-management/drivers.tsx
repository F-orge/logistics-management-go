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
  driverStatusColors,
  expiryDateCell,
  formatDate,
  statusBadgeCell,
} from "@/components/utils";
import {
  TransportManagementDriversResponse,
  UsersResponse,
} from "@/lib/pb.types";

type DriverResponse = TransportManagementDriversResponse<{
  user: UsersResponse;
}>;

export const options: RecordListOptions = {
  expand: "user",
};

export const actions: ContextMenuItem<DriverResponse>[] = [
  {
    label: "Copy ID",
    icon: <Copy />,
    onSelect: (row) => {
      navigator.clipboard.writeText(row.original.id);
      toast.success("Driver ID copied to clipboard");
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
    label: "Edit Driver",
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
    label: "Delete Driver",
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

export const columns: ColumnDef<DriverResponse>[] = [
  {
    accessorKey: "licenseNumber",
    header: "License Number",
    cell: ({ row }) => {
      const user = row.original.expand?.user;
      return (
        <Item size="sm" className="p-0">
          <ItemContent className="gap-0.5">
            <ItemTitle>{row.getValue("licenseNumber") as string}</ItemTitle>
            {user && (
              <ItemDescription>
                {user.name} ({user.email})
              </ItemDescription>
            )}
          </ItemContent>
        </Item>
      );
    },
  },
  {
    accessorKey: "licenseExpiryDate",
    header: "License Expiry",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>
            {expiryDateCell(
              row.getValue("licenseExpiryDate") as string | undefined
            )}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
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
              driverStatusColors
            )}
          </ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => (
      <Item size="sm" className="p-0">
        <ItemContent className="gap-0.5">
          <ItemTitle>{formatDate(row.getValue("created") as string)}</ItemTitle>
        </ItemContent>
      </Item>
    ),
  },
];
